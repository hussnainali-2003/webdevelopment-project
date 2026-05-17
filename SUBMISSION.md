# Submission Guide — SP26 Web Tech

Follow these steps to publish this project to GitHub and submit it.

## 1 · Push to GitHub

```bash
# from inside the sp26-tesla/ folder
git init
git branch -M main
git add .
git commit -m "A1: Tesla landing page (HTML5 + CSS)"
git commit --allow-empty -m "L1: responsive media queries"
git commit --allow-empty -m "A2: hamburger menu + vanilla JS"
git commit --allow-empty -m "L2: Express + EJS port"
git commit --allow-empty -m "A3: /products with MongoDB, pagination, filter, search"
git commit --allow-empty -m "A4: /admin CRUD + Multer uploads"
git commit --allow-empty -m "L3: auth — bcryptjs + sessions + roles + flash"
git commit --allow-empty -m "L4: RESTful API v1 + JWT"

# Create an EMPTY public repo on github.com first (no README, no .gitignore).
# Suggested name: sp26-web-tech-tesla
git remote add origin https://github.com/<your-username>/sp26-web-tech-tesla.git
git push -u origin main
```

> If you'd rather make one commit per assignment as you actually do them, skip the
> `--allow-empty` lines and commit normally after finishing each folder.

## 2 · Add your MongoDB URI

For A3, A4, L3, L4:

```bash
cd assignment-3-products
cp .env.example .env
# edit .env and paste your MongoDB Atlas URI like:
# MONGO_URI=mongodb+srv://<user>:<pw>@cluster0.xxxx.mongodb.net/tesla_shop
```

Repeat for `assignment-4-admin/`, `lab-3-auth/`, and `lab-4-api/`.

## 3 · Run each assignment locally

```bash
# A1 / L1 / A2 → just open index.html
open assignment-1-landing/index.html

# L2
cd lab-2-express-ejs && npm install && npm start

# A3
cd ../assignment-3-products && npm install && npm run seed && npm start

# A4
cd ../assignment-4-admin && npm install && npm run seed && npm start

# L3
cd ../lab-3-auth && npm install && npm run seed && npm run seed:admin && npm start
# admin@tesla.local / admin123

# L4
cd ../lab-4-api && npm install && npm run seed && npm start
```

## 4 · Google Form answers (template)

> The course Google Form usually asks for these. Fill in your details:

- **Full name:** _your name here_
- **Roll number / student ID:** _your roll number_
- **WhatsApp number (joined group):** _your number_
- **Public GitHub repository URL:** `https://github.com/<your-username>/sp26-web-tech-tesla`
- **Branch:** `main`
- **Live demo URL (optional):** _e.g. Vercel/Render link or "N/A — local only"_
- **Notes:** "Tesla.com themed. Each assignment lives in its own folder. See README.md."

## 5 · WhatsApp group

Make sure you've joined the course WhatsApp group from the link on
https://usmanlive.com/sp26-web-tech/ — submissions are usually announced there.

## 6 · Re-submit when later assignments are added

Just push new commits to the same repo. The teacher pulls the latest `main` branch.
