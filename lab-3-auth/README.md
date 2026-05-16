# Lab Assignment 3 — Auth (Sessions + bcrypt + Roles + Flash)

Adds full authentication on top of Assignment 4.

## What's new
- `User` model with bcryptjs-hashed passwords and a `role` field (`user` / `admin`)
- `express-session` with **`connect-mongo`** session store
- `connect-flash` for one-shot success / error messages
- Middleware: `isLoggedIn`, `isAdmin`
- Routes: `/register`, `/login`, `POST /logout`
- `/admin/*` is now protected by `isAdmin`

## Setup
```bash
npm install
cp .env.example .env       # add MONGO_URI + SESSION_SECRET
npm run seed               # 24 products
npm run seed:admin         # creates admin@tesla.local / admin123
npm start
```

## Try it
1. http://localhost:3000/register — create a regular account → redirected to /products
2. Try http://localhost:3000/admin → blocked, redirected to /login with flash
3. Log in as `admin@tesla.local / admin123` → access /admin
4. POST `/logout` (sample form on the navbar) ends the session

## Files added
```
models/User.js
middleware/auth.js
routes/auth.js
views/auth/login.ejs
views/auth/register.ejs
seed-admin.js
```
