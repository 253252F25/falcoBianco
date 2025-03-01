function auth(req, res, next) {
 

    if (req.session.user) {
        return next(); // Utente autenticato, continua
        
        
    } else {console.log("NA");
        res.redirect("/login"); // Utente non autenticato, reindirizza al login
    }
}

module.exports = auth;
