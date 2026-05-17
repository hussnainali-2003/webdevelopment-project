# Assignment 3 — Tesla Products Page (Mongo + EJS)

`/products` route powered by MongoDB with **pagination (8/page)**, **category filter**, and **search**.

## Stack
- Express 4 + EJS 3
- Mongoose 8 + MongoDB
- dotenv

## Setup
```bash
npm install
cp .env.example .env       # then paste your MongoDB URI into .env
npm run seed               # populate 24 sample Tesla products
npm start                  # http://localhost:3000/products
```

## Schema (`models/Product.js`)
- `name`, `price`, `category` (Apparel / Accessories / Charging / Lifestyle / Vehicles)
- `rating` (0-5), `stock`, `image`, `description`, timestamps

## Query examples
- `/products` — first 8
- `/products?page=2`
- `/products?category=Charging`
- `/products?search=wall`
- `/products?category=Vehicles&search=plaid&page=1`
