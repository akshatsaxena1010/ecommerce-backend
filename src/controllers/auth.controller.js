// const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.validateUserInput = ((req, res, next) => {
  if (!req.body || !req.body.name || !req.body.password) {
    res.status(400).send({ status: 'BAD REQUEST', message: 'name and/or password is empty.' });
    return;
  }
  next();
});

exports.registerUser = async (req, res) => {
  try {
    if (await prisma.users.findUnique({ where: { name: req.body.name } })) {
      res.status(409).send({ status: 'CONFLICT', message: 'User Already Exists' });
      return;
    }

    if (!req.body.type || !['buyer', 'seller'].includes(req.body.type.toLowerCase())) {
      res.status(400).send({ status: 'BAD REQUEST', message: 'usertype is invalid' });
      return;
    }

    const createdUser = await prisma.users.create({
      data: {
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 5),
        type: req.body.type,
      },
    });
    if (createdUser) {
      res.status(200).send({ status: 'SUCCESS', user: req.body.name, type: req.body.type.toLowerCase() });
      return;
    }
  } catch (err) {
    res.status(500).send({ status: 'INTERNAL_SERVER_ERROR', message: err });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({ where: { name: req.body.name } });

    if (!user) {
      res.status(404).send({ status: 'NOT_FOUND', message: 'user not found' });
      return;
    }
    if (!bcrypt.compare(req.body.password, user.password)) {
      res.status(401).send({ status: 'UNAUTHORIZED', message: 'invalid password' });
      return;
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.status(200).send({ status: 'SUCCESS', message: 'logged in successfully', accessToken });
    return;
  } catch (err) {
    res.status(500).send({ status: 'INTERNAL_SERVER_ERROR' });
  }
};
