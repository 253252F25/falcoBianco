const express = require('express');
const con = require('../utils/conn'); 
const router = express.Router();

router.get('/', (req, res) => { 
    
    var mes = {}

    if (req.session.user) {
        mes["user"] = req.session.user
    } else {
        mes["user"] = false
    }

    if (req.session.password_err) {
        mes["password_err"] = true;
    } else {
        mes["password_err"] = false;
    }

    res.render("login", mes);
});
router.all('/avable', (req, res) => {
    const query = 'SELECT * FROM utenti';
    con.query(query, (err, result) => {
        if (err){
            res.json({e:err})
        }else{
            res.json({r:result})
        } 
    });
});
router.post('/', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM utenti WHERE user = ? AND password = ?';

    con.query(query, [username, password], (err, result) => {
        
        if (err) {
            console.error(err);
            return res.status(500).send('Server error: ' + err.code);
        }

        if (result.length > 0) {
            // Se trovi l'utente, salva l'utente nella sessione
            req.session.messaggi = []
            req.session.password_err = false;
            req.session.idu = result[0].id;
            req.session.user = result[0].user;
            req.session.admin = result[0].admin;
        } else {
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
