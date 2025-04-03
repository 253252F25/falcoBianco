
const multer = require("multer");
const { Blob } = require("@vercel/blob");  // Importa il pacchetto Vercel Blob

// Inizializza Vercel Blob
const vercelBlob = new Blob({
  credentials: process.env.BLOB_READ_WRITE_TOKEN // La tua API key di Vercel Blob (assicurati di configurarla correttamente)
});

// Configurazione di Multer per caricare su Vercel Blob
const storage = multer.memoryStorage();  // Usa la memoria invece di salvare su disco

const upload = multer({ storage });

module.exports = upload