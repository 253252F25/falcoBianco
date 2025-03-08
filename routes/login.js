const express = require('express');
const con = require('../utils/conn');
const router = express.Router();

router.get('/', (req, res) => {
    mes = { password_err: "" }
    if (req.session.password_err) {
        mes = { password_err: "err" }
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
            return res.status(500).send('Server error: ' + err.code);
        }

        if (result.length > 0) {
            // Se trovi l'utente, salva l'utente nella sessione
            req.session.password_err = false;
            req.session.id = result[0].id;
            req.session.user = result[0].user;
            req.session.admin = result[0].admin;
        } else {
            // Se l'utente non è trovato o la password è errata
            req.session.password_err = true;
        }
        res.redirect("/index");
    })
});

router.all('/info', (req, res) => {
    const { id, user, admin } = req.session;
    if (req.session.user) {
        res.json({
            err: false,
            data: {
                id: id,
                user: user,
                admin: admin,
            }
        });
    } else {
        res.json({
            err: true,
            data: "No session, Plse log in"
        });
    }

});

module.exports = router;
