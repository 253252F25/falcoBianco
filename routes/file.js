const express = require('express');
const supabase = require('../utils/supabaseClient');
const router = express.Router();

async function getSignedFileUrl(filePath, tempo) {
    const { data, error } = await supabase
        .storage
        .from('uploads') // nome del tuo bucket
        .createSignedUrl(filePath, tempo);

    if (error) {
        console.error('Errore URL firmato:', error.message);
        return null;
    }

    return data.signedUrl; // Ritorna l'URL firmato
}
router.get('/:filename', async (req, res) => {
    var tempo = 60 * 60 // URL valido per 1 ora
    const filePath = `uploads/${req.params.filename}`;
    const url = await getSignedFileUrl(filePath, tempo); // ottieni URL firmato
    if (url) {
        res.redirect(url); // Reindirizza all'URL firmato per scaricare il file
    } else {
        res.status(500).send('Errore accesso file');
    }
});

module.exports = router;
