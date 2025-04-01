const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop(); // Ottieni l'estensione del file
    const newFileName = `${req.session.idu}_${Date.now()}.${fileExtension}`; // Usa idv e timestamp
    cb(null, newFileName);
  }
});
const upload = multer({ storage });

module.exports = upload