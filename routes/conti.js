const express = require('express');
const con = require('../utils/conn');
const router = express.Router();

router.post('/', (req, res) => {
    idu = req.session.idu
    con.query("SELECT c.*, u.user FROM conti as c JOIN utenti as u on u.id=c.utente WHERE utente = ?", [idu], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error: ' + err.code);
        }
        res.json(result);
    })
});

router.get("/",(req, res)=>{
    res.render("conti")
})

module.exports = router;
