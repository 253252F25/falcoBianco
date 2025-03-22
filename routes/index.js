const express = require('express');
const con = require('../utils/conn');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index");
});

router.post('/', (req, res) => {
    
    con.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error: ' + err.code);
        }
        res.json(result);
    })
});



module.exports = router;
