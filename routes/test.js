const express = require('express');
const con = require('../utils/conn');
const upload = require('../utils/upload');

const router = express.Router();

router.get("/job", (req, res) => {
    console.log("Cron job eseguito alle 03:00 UTC");
    // Aggiungi qui il codice che desideri eseguire
    res.status(200).json({ message: "Job eseguito con successo!" });
});

router.post("/file", upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).send("No file uploaded");
        }
    
        const fileExtension = req.file.originalname.split('.').pop(); // Ottieni l'estensione del file
        const newFileName = `${req.session.idu}_${Date.now()}.${fileExtension}`; // Usa idv e timestamp per il nome
    
        // Carica il file su Vercel Blob
        const blob = await vercelBlob.put({
          key: newFileName, // Usa il nuovo nome del file
          content: req.file.buffer, // Il file in memoria
          contentType: req.file.mimetype, // Il tipo MIME del file
        });
    
        // Rispondi con l'URL del file caricato su Vercel Blob
        res.status(200).json({ url: blob.url });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file");
      }
});

router.get("/file", (req, res) => {
    res.render("carica")
});

module.exports = router;
