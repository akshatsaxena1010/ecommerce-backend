# ecommerce-backend

A simple backend tool for an ecommerce website.
To run, just clone the repository in local and run 

```
npm i
node app.js
```

Please download the postman collection from [here](https://gist.githubusercontent.com/akshatsaxena1010/68b6a1789892c33e5d562ed7eb32c2bc/raw/b526738366a8d97af5913d91a9cb96f2e6c8b6ea/Test%2520APIs%2520for%2520ecommerce-backend.postman_collection.json)

## APIs

These are just API endpoints, for sample request/responses, please refer to the Postman Collection.

### Auth

`POST /api/auth/register` - To register an user

`POST /api/auth/login` - To login

### Buyer

`GET /api/buyer/list-of-sellers` - To get list of the available sellers

`GET /api/buyer/seller-catalog/:sellerId` - To get list of products available from a particular seller

`POST /api/buyer/create-order` - To create an order

### Seller

`POST /api/seller/create-catalog` - To create catalogs by specifying products and prices

`GET /api/seller/orders` - To get details of the orders placed by buyers

`GET /api/seller/catalog` - To view the catalog of the seller

## Notes

- This code has `ACCESS_TOKEN_SECRET` and `DATABASE_URL` public which is NOT RECOMMENDED and is only done temporarily for test purposes.
- The following packages are used in this project
  - `express` - For hosting the server and handling the APIs
  - `prisma` - ORM to simplify CRUD operations from the DB
  - `jsonwebtoken` - For generating and authenticating tokens
  - `bcrypt`- To generate hashed password before storing it in the DB
