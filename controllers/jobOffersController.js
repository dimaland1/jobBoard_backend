const db = require('../db/dbConfig');

exports.createJobOffer = (req, res) => {
    const { title, description, target_job, period, remuneration, location, status } = req.body;
    const employer_id = req.user.id; // Récupérer l'ID de l'employeur à partir du token

    const query = 'INSERT INTO job_offers (employer_id, title, description, target_job, period, remuneration, location, status) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [employer_id, title, description, target_job, period, remuneration, location, status], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de l\'offre d\'emploi:', err);
            res.status(500).send('Erreur lors de la création des données');
        } else {
            res.status(201).send('Offre d\'emploi créée avec succès');
        }
    });
}

exports.getAllJobOffers = (req, res) => {
    db.query('SELECT * FROM job_offers', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }
    });
};

exports.getJobOfferById = (req, res) => {

    const { id } = req.params;
    db.query('SELECT * FROM job_offers WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'offre d\'emploi:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else if (results.length === 0) {
            res.status(404).send('Offre d\'emploi non trouvée');
        } else {
            res.json(results[0]);
        }
    }
    );
};

exports.updateJobOffer = (req, res) => {
    const { id } = req.params;
    const { title, description, target_job, period, remuneration, location, status } = req.body;

    const query = `UPDATE job_offers SET title = ?, description = ?, target_job = ?, period = ?, remuneration = ?, location = ?, status = ? WHERE id = ?`;
    db.query(query, [title, description, target_job, period, remuneration, location, status, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'offre d\'emploi:', err);
            res.status(500).send('Erreur lors de la mise à jour des données');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Offre d\'emploi non trouvée');
        } else {
            res.send('Offre d\'emploi mise à jour avec succès');
        }
    });
};

exports.deleteJobOffer = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM job_offers WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'offre d\'emploi:', err);
            res.status(500).send('Erreur lors de la suppression des données');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Offre d\'emploi non trouvée');
        } else {
            res.send('Offre d\'emploi supprimée avec succès');
        }
    });
};

exports.getJobOffersByCityAndJobTitle = (req, res) => {

    console.log("requete: getJobOffersByCityAndJobTitle : ", req.params)
    
    const { city, jobTitle } = req.params;

    db.query('SELECT * FROM job_offers WHERE location = ? AND title = ?', [city, jobTitle], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            console.log("results: ", results)   
            res.json(results);
        }
    });
}