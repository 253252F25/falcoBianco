const multer = require('multer');
const { put } = require('@vercel/blob');

// Configurazione dello storage in memoria con multer
const storage = multer.memoryStorage();

// Crea il middleware multer che puoi utilizzare con .single('file')
const uploadMiddleware = multer({ storage: storage });



async function generate_url(file, idu, clf) {
  try {
    if (!file) {
      return null;
    }

    const fileName = `${Date.now()}-${idu}-${clf}-${file.originalname.split('.').pop()}`;

    // Usa il metodo `put` per caricare il file su Vercel Blob
    const blob = await put(fileName, file.buffer, {
      access: 'public',  // Impostazioni dell'accesso
    });

    return blob.url;  // Restituisce l'URL del file caricato
  } catch (error) {
    console.error("Errore durante il caricamento del file su Vercel Blob:", error);
    return null;
  }
}

module.exports = { generate_url, uploadMiddleware };

