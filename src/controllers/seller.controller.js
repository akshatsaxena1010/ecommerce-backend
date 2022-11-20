const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createCatalog = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products) {
      res.status(400).send({ status: 'INVALID_INPUT', message: 'No products in the request' });
      return;
    }

    // TODO: Check if products are there
    if (await prisma.catalogs.findMany({ where: { seller_id: req.user.id } })) {
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
    const orderDetails = await prisma.users.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        catalogs: {
          include: {
            orders: {
              include: {
                users: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (orderDetails.catalogs.length === 0) {
      res.status(204).send({ status: 'NO CONTENT', message: 'No catalog found for the user' });
      return;
    }

    if (orderDetails.catalogs[0].orders.length === 0) {
      res.status(204).send({ status: 'NO CONTENT', message: 'No order found for the user' });
      return;
    }

    const orders = orderDetails.catalogs[0].orders.map((order) => ({
      orderId: order.id,
      catalogId: order.catalog_id,
      products: order.products,
      buyerName: order.users.name,
    }));

    res.status(200).send({ status: 'SUCCESS', orders });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'INTERNAL_SERVER_ERROR' });
  }
};
