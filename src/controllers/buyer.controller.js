const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.listOfSellers = async (req, res) => {
  try {
    const sellers = await prisma.catalogs.findMany({
      include: {
        users: {
          select: {
            name: true,
          },
        },
      },
    });

    const sellersObj = sellers.map((seller) => ({
      seller_id: seller.seller_id,
      name: seller.users.name,
    }));

    res.status(200).send({ status: 'SUCCESS', sellers: sellersObj });
    return;
  } catch (err) {
    res.status(500).send();
  }
};

exports.sellerCatalog = async (req, res) => {
  try {
    if (!req.params.sellerId || Number.isNaN(Number(req.params.sellerId))) {
      res.status(400).send({ status: 'INVALID_REQUEST', message: 'Seller ID is invalid.' });
      return;
    }

    const catalog = await prisma.catalogs.findFirst({
      where: {
        seller_id: Number(req.params.sellerId),
      },
      include: {
        products: true,
      },
    });

    if (!catalog || !catalog.products || !catalog.products.length === 0) {
      res.status(404).send({ status: 'NOT_FOUND', message: 'Either seller doesn\'t exist or has no active catalogs.' });
      return;
    }

    res.status(200).send({ status: 'SUCCESS', products: catalog.products });
    return;
  } catch (err) {
    res.status(500).send();
  }
};

exports.createOrder = async (req, res) => {
  try {
    if (!req.params.sellerId || Number.isNaN(Number(req.params.sellerId))) {
      res.status(400).send({ status: 'INVALID_REQUEST', message: 'Seller ID is invalid.' });
      return;
    }

    if (!req.body.products || req.body.products.length === 0) {
      res.status(400).send({ status: 'INVALID_REQUEST', message: 'Product list not specified' });
      return;
    }

    const catalogDetails = await prisma.catalogs.findFirst({
      where: { seller_id: Number(req.params.sellerId) },
      select: { id: true },
    });

    const products = await prisma.products.findMany({
      select: { id: true },
      where: {
        AND: [
          { id: { in: req.body.products } },
          { catalog_id: catalogDetails.id },
        ],
      },
    });

    const createOrder = await prisma.orders.create({
      data: {
        buyer_id: req.user.id,
        catalog_id: catalogDetails.id,
        products: products.map((product) => product.id),
      },
    });

    res.status(200).send({ status: 'SUCCESS', createOrder });
    return;
  } catch (err) {
    res.status(500).send();
  }
};
