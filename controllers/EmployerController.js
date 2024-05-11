const db = require('../db/dbConfig');

exports.getEmployersOffers = (req, res) => {
    const employer_id = req.user.id; // Récupérer l'ID de l'employeur à partir du token

    db.query('SELECT * FROM job_offers WHERE employer_id = ?', [employer_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }
    });
}