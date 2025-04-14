const express = require('express')
const session = require('express-session')
const auth = require("./utils/auth")
const moment = require("moment-timezone");


const app = express()
const port = 3000
app.use(express.static('public'));


app.use(session({
    secret: process.env.FIRMA,
    resave: false,
    saveUninitialized: false, // Meglio false per sicurezza
    cookie: { secure: false } // Cambia in `true` se usi HTTPS
}));


app.use(express.urlencoded({ extended: true })); // Importante per gestire req.body
app.use(express.json()); // Se stai usando JSON invece di form

app.set('view engine', 'ejs');

// Usa le rotte con un prefisso
app.use('/login', require('./routes/login'));
app.use("/index", auth, require('./routes/index'));
app.use("/movimenti", auth, require('./routes/movimenti'));
app.use("/conti", auth, require('./routes/conti'));
app.use("/veicoli", auth, require('./routes/veicoli'));
app.use("/file", require('./routes/file'));
app.use("/test", require('./routes/test'));
app.get("/", (req, res) => {res.redirect("index")})

app.all("/logout", auth, (req,res) => {
  req.session.user = false
  req.session.destroy();
  res.redirect("/login")  
})

app.listen(port, () => {
  console.log("Redy 🚀");
  
})
