const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createCatalog = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products) {
      res.status(400).send({ status: 'INVALID_INPUT', message: 'No products in the request' });
      return;
    }

    if ((await prisma.catalogs.findMany({ where: { seller_id: req.user.id } })).length !== 0) {
      res.status(409).send({ status: 'CONFLICT', message: 'Catalog Already Exists' });
      return;
    }

    const createdCatalog = await prisma.catalogs.create({
      data: {
        seller_id: req.user.id,
      },
    });

    products.map(async (product) => {
      await prisma.products.create({
        data: {
          catalog_id: createdCatalog.id,
          product_name: product.name ?? 'Product X',
          price: product.price ?? 0,
        },
      });
    });

    res.status(200).send({ status: 'SUCCESS', createdCatalog, products: req.body.products });
  } catch (err) {
    res.status(500).send({ status: 'INTERNAL_SERVER_ERROR' });
  }
};

exports.orders = async (req, res) => {
  try {
    const orderDetails = await prisma.catalogs.findFirst({
      where: {
        seller_id: req.user.id,
      },
      select: {
        orders: {
          include: {
            users: true,
          },
        },
      },
    });

    if (orderDetails.orders.length === 0) {
      res.status(204).send({ status: 'NO CONTENT', message: 'No order found for the user' });
      return;
    }

    const orders = orderDetails.orders.map((order) => ({
      orderId: order.id,
      catalogId: order.catalog_id,
      products: order.products,
      buyerName: order.users.name,
    }));

    res.status(200).send({ status: 'SUCCESS', orders });
    return;
  } catch (err) {
    res.status(500).send({ status: 'INTERNAL_SERVER_ERROR' });
  }
};

exports.catalogDetails = async (req, res) => {
  try {
    const catalogDetails = await prisma.catalogs.findFirst({
      where: {
        seller_id: req.user.id,
      },
      include: {
        products: true,
      },
    });
    res.status(200).send({ status: 'SUCCESS', catalogDetails });
  } catch (err) {
    res.status(500).send({ status: 'INTERNAL_SERVER_ERROR' });
  }
};
