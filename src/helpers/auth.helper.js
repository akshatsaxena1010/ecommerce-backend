const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = 'oqerwRZqbkmExBJmZasnXSPjmdIQHJFcVzlMnHfflmVjAPApmxXmwHMijiSF';

exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send({ status: 'UNAUTHORIZED', message: 'No token provided' });

    req.user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    next();
    return true;
  } catch (err) {
    res.status(500).send({ status: 'INTERNAL_SERVER_ERROR' });
  }
};
