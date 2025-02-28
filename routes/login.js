const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('a');
});

router.post('/:id', (req, res) => {
    res.send(`b`);
});

module.exports = router;
