//route.js

const express = require('express');
const con = require('../utils/conn');
const {generate_url, upload} = require('../utils/upload');

const router = express.Router();

router.get("/job", (req, res) => {
  console.log("Cron job eseguito alle 03:00 UTC");
  // Aggiungi qui il codice che desideri eseguire
  res.status(200).json({ message: "Job eseguito con successo!" });
});




router.post("/file", upload.single('file') , async (req, res) => {
  url = await generate_url(req.file, "X", "T")
  res.status(200).end(url)
});

router.get("/file", (req, res) => {
  res.render("carica")
});

module.exports = router;
