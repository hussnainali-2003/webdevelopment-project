# SP26 Web Tech — Tesla.com Project

All assignments and lab tasks for the **SP26 Web Tech** course (https://usmanlive.com/sp26-web-tech/), themed around **Tesla.com**.

## Folder map

| Folder                       | Course task                                                                |
|------------------------------|----------------------------------------------------------------------------|
| `assignment-1-landing/`      | **A1** · Tesla landing page (HTML5 + CSS only)                             |
| `lab-1-responsive/`          | **L1** · Make A1 responsive with `@media` queries                          |
| `assignment-2-menu/`         | **A2** · Responsive top nav + hamburger menu (vanilla JS)                  |
| `lab-2-express-ejs/`         | **L2** · Convert A2 to Express + EJS                                       |
| `assignment-3-products/`     | **A3** · `/products` with MongoDB, pagination, filter, search              |
| `assignment-4-admin/`        | **A4** · `/admin` CRUD + Multer image upload                               |
| `lab-3-auth/`                | **L3** · bcryptjs + express-session + connect-mongo + connect-flash + roles|
| `lab-4-api/`                 | **L4** · RESTful API `/api/v1` with JWT                                    |

Each folder is **independent** with its own `package.json`, `README.md`, and `.env.example` where needed.

## Quick start

For pure HTML assignments (A1, L1, A2):
```bash
# Just open index.html in your browser
```

For Node assignments (L2 → L4):
```bash
cd <folder>
npm install
cp .env.example .env       # for A3/A4/L3/L4 — paste your MongoDB URI
npm run seed               # where applicable
npm start
```

## Recommended order
A1 → L1 → A2 → L2 → A3 → A4 → L3 → L4

## Tech
- HTML5, CSS3, Vanilla JS
- Node.js + Express 4 + EJS 3
- MongoDB + Mongoose 8
- bcryptjs, express-session, connect-mongo, connect-flash, multer, jsonwebtoken, dotenv

## Submission
See **`SUBMISSION.md`** for git/GitHub steps and Google Form answers.
