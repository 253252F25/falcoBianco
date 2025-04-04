//route.js

const express = require('express');
const con = require('../utils/conn');
const { generate_url, uploadMiddleware } = require('../utils/upload');


const router = express.Router();

router.get("/job", (req, res) => {
  console.log("Cron job eseguito alle 03:00 UTC");
  // Aggiungi qui il codice che desideri eseguire
  res.status(200).json({ message: "Job eseguito con successo!" });
});




router.post("/file", uploadMiddleware.single('file'), async (req, res) => {
  try {
    const url = await generate_url(req.file, "X", "T");
    if (url) {
      res.status(200).json({ url });
    } else {
      res.status(500).json({ message: 'Errore nel generare l\'URL' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore nel processare il file', error });
  }
});

// Route per visualizzare il form di caricamento
router.get("/file", (req, res) => {
  res.render("carica");  // Assicurati che la vista 'carica' esista
});


module.exports = router;
