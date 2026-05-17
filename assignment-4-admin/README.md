# Assignment 4 — Tesla Admin CRUD with Multer

Adds an `/admin` panel on top of A3:
- List all products in a table
- Create new product (with image upload)
- Edit product
- Delete product (with confirm)
- Multer disk storage → `public/uploads/`
- Separate admin EJS layout (`views/admin/` + `public/css/admin.css`)

## Setup
```bash
npm install
cp .env.example .env       # add your MONGO_URI
npm run seed
npm start
```

- Shop:  http://localhost:3000/products
- Admin: http://localhost:3000/admin

## Routes
| Method | Path                    | Purpose         |
|--------|-------------------------|-----------------|
| GET    | /admin                  | List products   |
| GET    | /admin/new              | New form        |
| POST   | /admin                  | Create          |
| GET    | /admin/:id/edit         | Edit form       |
| PUT    | /admin/:id              | Update          |
| DELETE | /admin/:id              | Delete          |

Uses `method-override` so HTML forms can issue PUT/DELETE.
Uploaded images are limited to 5 MB and image MIME types only.
