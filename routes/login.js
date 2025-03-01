const express = require('express');
const con = require('../utils/conn');
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
    req.session.password_err = true;
    const { username, password } = req.body;

    const query = 'SELECT * FROM utenti WHERE user = ? AND password = ?';

    
    con.query(query, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        if (result.length > 0) {
            // Se trovi l'utente, salva l'utente nella sessione
            req.session.password_err = false;
            req.session.user = username; 
        } else { 
            // Se l'utente non è trovato o la password è errata
            req.session.password_err = true;
        }
        res.redirect("/index");
    })  
});

module.exports = router;
