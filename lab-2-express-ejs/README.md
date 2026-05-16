# Lab Task 2 — Express + EJS Tesla Landing

Ports Assignment 2 to Node.js + Express with EJS templating.

## Stack
- Express 4
- EJS 3
- Static assets via `express.static`

## Run
```bash
npm install
npm start
# open http://localhost:3000
```

## Structure
```
app.js                  # Express server, /  route
views/
  index.ejs             # main page template
  partials/
    nav.ejs             # navbar + mobile panel partial
    footer.ejs          # footer partial
public/
  css/style.css
  js/script.js
  images/*.jpg
```
