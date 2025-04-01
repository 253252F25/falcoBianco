const express = require('express');
const con = require('../utils/conn');
const upload = require('../utils/upload');
const router = express.Router();

router.post('/', (req, res) => {
    idu = req.session.idu
    con.query("SELECT v.*, t.denominazione AS denom FROM veicoli AS v JOIN tipoveicolo AS t ON t.id = v.tipo ORDER BY v.tipo", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error: ' + err.code);
        }
        res.json(result);
    })
});

router.get("/", (req, res) => {
    res.render("veicoli", req.session.messaggi)
})

router.get("/:idv", async (req, res) => {
    try {
        const idv = req.params.idv;

        // Wrappa con una Promise l'esecuzione delle query
        const veicoli = await new Promise((resolve, reject) => {
            con.query(
                "SELECT v.*, t.denominazione AS denom FROM veicoli AS v JOIN tipoveicolo AS t ON t.id = v.tipo WHERE v.id = ? ORDER BY v.tipo",
                [idv],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result[0]);
                }
            );
        });

        const tipologia = await new Promise((resolve, reject) => {
            con.query("SELECT * FROM tipoveicolo", (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        // Renderizza la pagina passando i dati
        messaggi = req.session.messaggi
        res.render("veicolo", { veicoli, tipologia, messaggi});
        messaggi = []

    } catch (error) {
        console.error("Errore nella query:", error);
        res.status(500).send('Server error: ' + error.code);
    }
});

 

router.post("/:idv", upload.single('file'), (req, res) => {
    const idv = req.params.idv;
    var { targa, telaio, modello, marca, tipo, immatricolazione, librettodata, attivo, tachigrafo, revisioni, assicurazione } = req.body;

    // Inizializza messaggi di sessione se non esistono
    if (!req.session.messaggi) {
        req.session.messaggi = [];
    }

    if (!targa || !telaio || !modello || !marca || !tipo) {
        req.session.messaggi.push({ tipo: "warning", messaggio: "Dati mancanti nel corpo della richiesta." });
        return res.redirect(`/veicoli/${idv}`); // Interrompe l'esecuzione e reindirizza subito
    }

    // Converte i checkbox in valori numerici
    attivo = attivo === "on" ? 1 : 0;
    tachigrafo = tachigrafo === "on" ? 1 : 0;
    revisioni = revisioni === "on" ? 1 : 0;
    assicurazione = assicurazione === "on" ? 1 : 0;

    // Gestione valori nulli
    librettodata = librettodata || null;
    immatricolazione = immatricolazione || null;

    let filePath = req.file ? req.file.filename : null;

    // Query di aggiornamento
    const query = `
        UPDATE veicoli 
        SET 
            targa = ?, 
            telaio = ?, 
            marca = ?, 
            modello = ?, 
            tipo = ?, 
            immatricolazione = ?, 
            libretto = ?, 
            revisioni = ?, 
            assicurazioni = ?, 
            tachigrafo = ?, 
            attivo = ?, 
            libretto_rif = IFNULL(?, libretto_rif)
        WHERE id = ?
    `;

    const params = [
        targa, telaio, marca, modello, tipo, immatricolazione,
        librettodata, revisioni, assicurazione, tachigrafo, attivo, filePath, idv
    ];

    // Esegui la query in modo asincrono
    con.query(query, params, (err, result) => {
        if (err) {
            console.error("Errore durante l'aggiornamento:", err);
            req.session.messaggi.push({ tipo: "danger", messaggio: "Errore durante l'aggiornamento del veicolo" });
        } else {
            req.session.messaggi.push({ tipo: "success", messaggio: "Aggiornamento del veicolo effettuato" });
        }

        // Reindirizza solo dopo aver gestito la query
        res.redirect(`/veicoli/${idv}`);
    });
});

 

module.exports = router;