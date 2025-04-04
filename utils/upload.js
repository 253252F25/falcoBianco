
//upload.js
const multer = require("multer");
const { Blob } = require("@vercel/blob");  // Importa il pacchetto Vercel Blob

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

async function generate_url(file, idu, clf) {
  try {

    if (!file) {
      return null;
    }


    const apiToken = process.env.BLOB_READ_WRITE_TOKEN;  // Sostituisci con il tuo token API di Vercel
    const fileName = `${Date.now()}-${idu}-${clf}-${file.originalname.split('.').pop()}`;
    const response = await Blob({
      apiToken,
      fileName,
      buffer: file.buffer,
      contentType: file.mimetype,
    });
    return response.url
  } catch (error) {
    console.error(error)
    return null
  }
}

module.exports = {generate_url, uploadMiddleware}