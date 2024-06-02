const db = require('../db/dbConfig');

exports.createJobOffer = (req, res) => {

    /*
    data class AddJob(
    val employer_id: Int,
    val title: String,
    val description: String,
    val target_job: String,
    val period: String,
    val remuneration: Int,
    val location: String,
    val status: String
)
    */
    
    const { employer_id, title, description, target_job, period, remuneration, location, status } = req.body;

    console.log("create Job offer: ", req.body)

    const query = 'INSERT INTO job_offers (employer_id, title, description, target_job, period, remuneration, location, status) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [employer_id, title, description, target_job, period, remuneration, location, status], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de l\'offre d\'emploi:', err);
            res.status(500).send('Erreur lors de la création des données');
        } else {
            console.log('Offre d\'emploi créée avec succès');
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

    db.query(
        "DELETE FROM applications WHERE job_offer_id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.error('Erreur lors de la suppression des candidatures:', err);
                res.status(500).send('Erreur lors de la suppression des données');
            }
        }
    )

    const query = 'DELETE FROM job_offers WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'offre d\'emploi:', err);
            res.status(500).send('Erreur lors de la suppression des données');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Offre d\'emploi non trouvée');
        } else {
            console.log('Offre d\'emploi supprimée avec succès');
            res.send('Offre d\'emploi supprimée avec succès');
        }
    });
};


exports.getJobOffersByCityAndJobTitle = (req, res) => {

    console.log("requete: getJobOffersByCityAndJobTitle : ", req.params)
    
    const { city, jobTitle } = req.params;

    db.query('SELECT * FROM job_offers WHERE location = ? AND target_job = ?', [city, jobTitle], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            console.log("results: ", results)   
            res.json(results);
        }
    });
}


exports.getJobOffersByEmployer = (req, res) => {
    // Extraire employer_id des paramètres de la requête
    let { id } = req.params;

    console.log("requete: getJobOffersByEmployer : ", req.params)

    // Convertir employer_id en entier
    let intNumber = parseInt(id, 10);

    // Vérifiez si la conversion a réussi
    if (isNaN(intNumber)) {
        console.error(`Invalid employer_id: ${id}`);
        return res.status(400).send('Invalid employer_id');
    }

    console.log(`Requête: getJobOffersByEmployer avec employer_id: ${intNumber}`);

    // Exécuter la requête SQL pour récupérer les offres d'emploi
    db.query('SELECT * FROM job_offers WHERE employer_id = ?', [intNumber], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', err);
            return res.status(500).send('Erreur lors de la récupération des données');
        } else {
            console.log(`Résultats de la requête pour employer_id ${intNumber}:`, results);
            res.json(results);
        }
    });
};