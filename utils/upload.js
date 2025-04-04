const multer = require('multer');
const { Blob } = require('@vercel/blob');

// Configurazione dello storage in memoria con multer
const storage = multer.memoryStorage();

// Crea il middleware multer che puoi utilizzare con .single('file')
const uploadMiddleware = multer({ storage: storage });

async function generate_url(file, idu, clf) {
  try {
    if (!file) {
      console.error("Funzione non riceve file");
      
      return null;
    }

    const apiToken = process.env.BLOB_READ_WRITE_TOKEN;
    const fileName = `${Date.now()}-${idu}-${clf}-${file.originalname.split('.').pop()}`;
    const response = await Blob({
      apiToken,
      fileName,
      buffer: file.buffer,
      contentType: file.mimetype,
    });

    return response.url;
  } catch (error) {
    console.error("Errore durante il caricamento del file su Vercel Blob:", error);
    return null;
  }
}

module.exports = { generate_url, uploadMiddleware };
