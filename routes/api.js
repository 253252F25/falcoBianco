const express = require('express');
const con = require('../utils/conn');
const router = express.Router();

router.get("/job", (req, res) => {
    console.log("Cron job eseguito alle 03:00 UTC");
    // Aggiungi qui il codice che desideri eseguire
    res.status(200).json({ message: "Job eseguito con successo!" });
});

module.exports = router;
