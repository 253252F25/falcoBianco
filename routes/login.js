const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    mes = {password_err:""}
    if (req.session.password_err) {
        mes = {password_err:"err"}
    }
    req.session.password_err = false
    res.render("login", mes);
});

router.post('/', (req, res) => {
   
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        req.session.password_err = false
        req.session.user = username; 
        
    } else {
        req.session.password_err = true
    }
    res.redirect("/index");
});

module.exports = router;
