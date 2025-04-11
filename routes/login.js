const express = require('express');
const connectToDatabase = require('../utils/conn'); 
const router = express.Router();

router.get('/', (req, res) => { 
    const mes = {
        user: req.session.user || false,
        password_err: req.session.password_err || false
    };
    res.render("login", mes);
});

router.all('/avable', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const utenti = await db.collection('utenti').find({}).toArray();
        res.json({ r: utenti });
    } catch (err) {
        res.json({ e: err.message });
    }
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = await connectToDatabase();
        const user = await db.collection('utenti').findOne({ user: username, password: password });

        if (user) {
            req.session.messaggi = [];
            req.session.password_err = false;
            req.session.idu = user._id;
            req.session.user = user.user;
            req.session.admin = user.admin;
        } else {
            req.session.password_err = true;
        }

        res.redirect("/index");

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error: ' + err.message);
    }
});

router.all('/info', (req, res) => {
    const { idu, user, admin } = req.session;
    if (req.session.user) {
        res.json({
            err: false,
            data: {
                id: idu,
                user: user,
                admin: admin,
            }
        });
    } else {
        res.json({
            err: true,
            data: "No session, Please log in"
        });
    }
});

module.exports = router;
