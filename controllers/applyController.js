const db = require('../db/dbConfig');

// cree une candidature pour un candidat
exports.createApplication = (req, res) => {
    const { job_offer_id, candidate_id } = req.body;

    db.query('INSERT INTO applications (job_offer_id, candidate_id) VALUES (?, ?)', [job_offer_id, candidate_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la création de la candidature:', err);
            res.status(500).send('Erreur lors de la création de la candidature');
        } else {
            res.status(201).send('Candidature créée avec succès');
        }
    });
}


// Récupérer toutes les candidatures d'une offre d'emploi
exports.getApplicationsByJobOfferId = (req, res) => {
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

// Mettre à jour le statut d'une candidature
exports.updateApplicationStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.query('UPDATE applications SET status = ? WHERE id = ?', [status, id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la mise à jour du statut de la candidature:', err);
            res.status(500).send('Erreur lors de la mise à jour du statut de la candidature');
        } else {
            res.status(200).send('Statut de la candidature mis à jour avec succès');
        }
    });
}

// Mettre à jour le commentaire d'une candidature
exports.updateApplicationComment = (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    db.query('UPDATE applications SET comment = ? WHERE id = ?', [comment, id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la mise à jour du commentaire de la candidature:', err);
            res.status(500).send('Erreur lors de la mise à jour du commentaire de la candidature');
        } else {
            res.status(200).send('Commentaire de la candidature mis à jour avec succès');
        }
    });
}

// Récupérer toutes les candidatures d'un candidat
exports.getApplicationsByCandidateId = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM applications WHERE candidate_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des candidatures:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }
    });
}