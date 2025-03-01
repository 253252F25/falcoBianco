const express = require('express')
const ejs = require("ejs")
const session = require('express-session')

const app = express()
const port = 3000
app.use(express.static('public'));
app.set('view engine', 'ejs');


const login = require('./routes/login');

// Usa le rotte con un prefisso
app.use('/login', login);

app.all("/index", (req,res) => {
  res.render("index")
})

app.all("*", (req,res) => {
  res.redirect("index")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
