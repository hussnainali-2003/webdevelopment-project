# Tesla E-Commerce (Express + EJS + MongoDB)

Full-stack project covering:
- **Assignment 3** – Dynamic product catalog with server-side pagination, search, category + price filters
- **Assignment 4** – Admin panel with full CRUD and Multer image uploads
- **Lab Assignment 3** – Sessions, bcrypt auth, RBAC, flash messages
- **Lab Assignment 4** – RESTful API under `/api/v1` secured with JWT

## Quick start

```bash
npm install
# Make sure MongoDB is running locally, or edit config/default.json -> mongoURI
npm run seed     # creates 28 products + admin/customer accounts
npm run dev      # http://localhost:3000
```

### Seeded accounts
| Role     | Email               | Password   |
|----------|---------------------|------------|
| Admin    | admin@tesla.com     | admin123   |
| Customer | customer@tesla.com  | customer123|

## Routes

### Public
- `GET /` – Tesla-styled landing page
- `GET /products?page=&q=&category=&minPrice=&maxPrice=&sort=` – paginated catalog (8/page)
- `GET /products/:id` – product detail
- `GET /auth/login`, `GET /auth/register`, `POST /auth/logout`

### Admin (requires `role=admin`)
- `GET /admin` – dashboard
- `GET /admin/products` – product table
- `GET /admin/products/new`, `POST /admin/products`
- `GET /admin/products/:id/edit`, `POST /admin/products/:id?_method=PUT`
- `POST /admin/products/:id?_method=DELETE` – with confirm popup

### REST API (`/api/v1`)
- `POST /api/v1/auth/login` – returns `{ token }`
- `GET  /api/v1/products` – pagination + filtering
- `GET  /api/v1/products/:id`
- `POST /api/v1/orders` *(Bearer JWT)*
- `GET  /api/v1/user/profile` *(Bearer JWT)*

## Tech
Express 4, EJS, express-ejs-layouts, Mongoose 8, express-session + connect-mongo, connect-flash, bcryptjs, jsonwebtoken, Multer (disk storage in `public/uploads`).