CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    type TEXT NOT NULL,
    CONSTRAINT UQ_Users_Name UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS Catalogs (
    id SERIAL PRIMARY KEY,
    seller_id  INT,
    CONSTRAINT FK_Catalog_Users FOREIGN KEY(seller_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS Products (
    id SERIAL PRIMARY KEY,
    catalog_id INT,
    product_name TEXT NOT NULL,
    price INT,
    CONSTRAINT FK_Products_Catalogs FOREIGN KEY(catalog_id) REFERENCES catalogs(id)
);

CREATE TABLE IF NOT EXISTS Orders (
    id SERIAL PRIMARY KEY,
    buyer_id INT,
    catalog_id INT,
    products INT[],
    CONSTRAINT FK_Orders_Users_Buyer FOREIGN KEY(buyer_id) REFERENCES Users(id),
    CONSTRAINT FK_Orders_Catalogs FOREIGN KEY(catalog_id) REFERENCES Catalogs(id)
);
