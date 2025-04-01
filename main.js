// api/index.js
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const conn = require('../utils/conn');  // Importa la connessione MySQL
const auth = require('../utils/auth');
const path = require('path');
const moment = require("moment-timezone");

const now = moment().tz("Europe/Rome");
const sessionStore = new MySQLStore({}, conn);

const app = express();

// Middleware
app.use(express.static('public'));
app.use(session({
  secret: "segreto",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: false }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Definisci le route
app.use('/login', require('../routes/login'));
app.use("/index", auth, require('../routes/index'));
app.use("/movimenti", auth, require('../routes/movimenti'));
app.use("/conti", auth, require('../routes/conti'));
app.use("/veicoli", auth, require('../routes/veicoli'));
app.use("/uploads", auth, express.static(path.join(__dirname, '../uploads')));

// Logout
app.all("/logout", auth, (req, res) => {
  req.session.user = false;
  req.session.destroy();
  res.redirect("/login");
});

// Vercel richiede che la funzione ritorni una risposta per ogni richiesta
module.exports = (req, res) => app(req, res);
