// upload.js
const multer = require('multer');
const supabase = require('./supabaseClient');

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

async function generate_url(file, idu, clf) {
  try {
    if (!file) return null;

    const ext = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${idu}-${clf}.${ext}`;
    const filePath = `uploads/${fileName}`; // Questo è il percorso del file nel bucket

    const { data, error } = await supabase.storage
      .from('uploads') // nome del bucket
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false, // Se c'è un file con lo stesso nome, non sovrascrivere
      });

    if (error) {
      console.error('Errore upload:', error.message);
      return null;
    }

    // Restituisci solo il percorso del file nel bucket
    return fileName; 
  } catch (err) {
    console.error('Errore durante il caricamento del file:', err);
    return null;
  }
}




module.exports = { generate_url, uploadMiddleware };