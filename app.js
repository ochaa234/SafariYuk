const express = require('express');
const session = require('express-session');
const router = require('./routes');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'safariyuk',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.query = req.query;
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`SafariYuk jalan di http://localhost:${port}`);
});
