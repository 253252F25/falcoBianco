const express = require('express')
const session = require('express-session')
const auth = require("./utils/auth")
 

const app = express()
const port = 3000
app.use(express.static('public'));
app.use(session({
    secret: "segreto",
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true })); // Importante per gestire req.body
app.use(express.json()); // Se stai usando JSON invece di form

app.set('view engine', 'ejs');

const login = require('./routes/login');

// Usa le rotte con un prefisso
app.use('/login', login);

app.all("/index", auth, (req,res) => {
  res.render("index")
})

app.all("/logout", auth, (req,res) => {
  req.session.destroy();
  res.redirect("/login")  
})

app.all("/", (req, res) => {
  res.redirect("/index")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
