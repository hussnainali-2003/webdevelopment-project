# Lab Assignment 4 — RESTful API + JWT (`/api/v1`)

A pure JSON API with **JWT** authentication. No EJS, no sessions.

## Setup
```bash
npm install
cp .env.example .env       # set MONGO_URI + JWT_SECRET
npm run seed               # seed admin + user + products
npm start                  # → http://localhost:4000/api/v1
```

Seeded credentials:
- `admin@tesla.local / admin123` (role: admin)
- `user@tesla.local  / user1234`  (role: user)

## Endpoints

| Method | Path                       | Auth          | Purpose                      |
|--------|----------------------------|---------------|------------------------------|
| POST   | /api/v1/auth/register      | —             | Register, returns JWT        |
| POST   | /api/v1/auth/login         | —             | Login, returns JWT           |
| GET    | /api/v1/profile            | Bearer        | Current user                 |
| GET    | /api/v1/products           | —             | List + paginate + filter     |
| GET    | /api/v1/products/:id       | —             | Single product               |
| POST   | /api/v1/products           | Bearer admin  | Create                       |
| PUT    | /api/v1/products/:id       | Bearer admin  | Update                       |
| DELETE | /api/v1/products/:id       | Bearer admin  | Delete                       |
| GET    | /api/v1/orders             | Bearer        | My orders (admin: all)       |
| POST   | /api/v1/orders             | Bearer        | Place order                  |

`Authorization: Bearer <token>` is read by `middleware/auth.js → verifyToken`.

## Quick test (curl)

```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:4000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@tesla.local","password":"admin123"}' | jq -r .token)

# List products
curl http://localhost:4000/api/v1/products

# Place an order
curl -X POST http://localhost:4000/api/v1/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"items":[{"productId":"<id>","quantity":2}]}'
```
