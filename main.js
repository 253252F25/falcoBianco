const express = require('express')
const session = require('express-session')
const auth = require("./utils/auth")
const MySQLStore = require("express-mysql-session")(session);
const conn = require("./utils/conn");  // Importa la connessione MySQL

// Configura il session store
const sessionStore = new MySQLStore({}, conn); 

const app = express()
const port = 3000
app.use(express.static('public'));



app.use(session({
    secret: "segreto",
    resave: false,
    saveUninitialized: false, // Meglio false per sicurezza
    store: sessionStore, // Usa il database per le sessioni
    cookie: { secure: false } // Cambia in `true` se usi HTTPS
}));

app.use(express.urlencoded({ extended: true })); // Importante per gestire req.body
app.use(express.json()); // Se stai usando JSON invece di form

app.set('view engine', 'ejs');

const login = require('./routes/login');
const index = require('./routes/index');

// Usa le rotte con un prefisso
app.use('/login', login);

app.use("/index", auth, index);

app.all("/logout", auth, (req,res) => {
  req.session.user = false
  req.session.destroy();
  res.redirect("/login")  
})

app.all("/", (req, res) => {
  res.redirect("/index")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
