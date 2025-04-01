const express = require('express');
const con = require('../utils/conn');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("movimenti");
});

router.post('/:idc', (req, res) => {
    idc = req.params.idc
    con.query("SELECT * FROM movimenti WHERE conto = ?", [idc], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error: ' + err.code);
        }
        res.json(result);
    })
});

router.get('/:idc', (req, res) => {
    const idc = req.params.idc;
    query = "SELECT c.nome FROM conti as c WHERE id = ?"
    con.query(query, [idc], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error: ' + err.code);
        }
        if (result.length > 0) {
            res.render("movimenti", {idc: idc, nomc:result[0].nome});
        } else {
            res.redirect("/conti")
        }})
    
});



router.get('/:idc/:idm', (req, res) => {
    const idc = req.params.idc; // 3
    const idm = req.params.idm; //6
    const idu = req.session.idu; //2
    query = `SELECT 
m.id as id,
m.importo as importo,
m.created_at as created_at,
m.descrizione as descrizione,
c.utente as utente,
c.nome as conto,
c.id as idc,
u.user as nmu
FROM movimenti AS m JOIN conti AS c JOIN utenti as u
ON u.id = c.utente AND c.id = m.conto
WHERE
    m.id = ? AND
    c.utente = ? AND
    c.id = ?;
`
    con.query(query, [idm, idu, idc], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error: ' + err.code);
        }
        if (result.length > 0) {
            res.render("movimento", result[0]);
        } else {
            res.redirect(`/movimenti/${idc}`)
        }
    })
});





module.exports = router;
