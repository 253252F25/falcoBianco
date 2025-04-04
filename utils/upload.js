const multer = require('multer');
const { Blob } = require('@vercel/blob'); // Importa Vercel Blob

// Configurazione dello storage in memoria con multer
const storage = multer.memoryStorage();

// Crea un middleware multer con il tipo di storage in memoria
const uploadMiddleware = multer({ storage: storage });

// Funzione per caricare il file su Vercel Blob
async function generate_url(file, idu, clf) {
  try {
    if (!file) {
      return null;
    }

    // Token API di Vercel (assicurati di configurarlo nel tuo ambiente)
    const apiToken = process.env.BLOB_READ_WRITE_TOKEN; 

    // Nome del file che verrà salvato (con timestamp per garantire univocità)
    const fileName = `${Date.now()}-${idu}-${clf}-${file.originalname.split('.').pop()}`;

    // Carica il file su Vercel Blob
    const response = await Blob({
      apiToken,
      fileName,
      buffer: file.buffer,  // Il file caricato in memoria
      contentType: file.mimetype,  // Il tipo MIME del file
    });

    // Restituisce l'URL del file caricato su Vercel Blob
    return response.url;
  } catch (error) {
    console.error("Errore durante il caricamento del file su Vercel Blob:", error);
    return null;
  }
}

module.exports = { generate_url, uploadMiddleware };  // Esporta la funzione e il middleware
