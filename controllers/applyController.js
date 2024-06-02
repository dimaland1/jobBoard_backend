const { json } = require('express');
const db = require('../db/dbConfig');

// cree une candidature pour un candidat
exports.createApplication = (req, res) => {

    const { email, dateNaissance, job_id, name, first_name, nationality } = req.body;

    const application_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const status = 'En attente';

    console.log("candidature de ", req.body)

    let canditate_id = 1;

    console.log("job id : " + job_id);

    db.query('SELECT id FROM candidate WHERE email = ? AND name = ? AND first_name = ?', [email, name, first_name], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du candidat:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            if (results.length > 0) {
                console.log("Le résultat est : " + results);
                canditate_id = results[0].id; // Accédez à l'ID du candidat
            }
        }
    });
    
/*
    // verifier si la candidature existe deja
    db.query('SELECT * FROM applications WHERE candidate_id = ? AND job_offer_id = ?', [canditate_id, job_id], (err, results) => {
        if (results.length > 0) {
            console.log('Candidature déjà existante');
            res.status(409).send('Candidature déjà existante');
        }
    });
*/

    db.query('INSERT INTO applications (candidate_id, job_offer_id, application_date, status) VALUES (?, ?, ?, ?)', [canditate_id, job_id, application_date, status], (err, results) => {
        if (err) {
            console.error('Erreur lors de la création de la candidature:', err);
            res.status(500).send('Erreur lors de la création de la candidature');
        } else {
            console.log('Candidature créée avec succès');
            res.status(201).send('Candidature créée avec succès');
        }
    });

}
// Récupérer toutes les candidatures d'une offre d'emploi
exports.getApplicationsByJobOfferId = (req, res) => {
    const { id } = req.params;
    
    console.log("getApplicationsByJobOfferId : " + id);

    db.query('SELECT * FROM applications WHERE job_offer_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', err);
            return res.status(500).send('Erreur lors de la récupération des données');
        }

        let promises = results.map(result => {
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM candidate WHERE id = ?', [result.candidate_id], (err, candidateResults) => {
                    if (err) {
                        console.error('Erreur lors de la récupération des offres d\'emploi:', err);
                        return reject('Erreur lors de la récupération des données');
                    }
                    if (candidateResults.length > 0) {
                        let card = {
                            name: candidateResults[0].name,
                            first_name: candidateResults[0].first_name,
                            dateCandidate: result.application_date,
                            status: result.status,
                            logo_url: candidateResults[0].logo_url
                        };
                        resolve(card);
                    } else {
                        resolve(null);
                    }
                });
            });
        });

        Promise.all(promises)
            .then(cards => {
                res.json(cards.filter(card => card !== null));
            })
            .catch(error => {
                res.status(500).send('Erreur lors de la récupération des données');
            });
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
exports.getApplicationsByCandidateId = async (req, res) => {
    const { id } = req.params;

    console.log("id du candidat : " + id);

    let id_int = parseInt(id);

    try {
        const applications = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM applications WHERE candidate_id = ?', [id_int], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        let jobOfferPromises = applications.map(application => {
            if (application.job_offer_id === null) {
                return Promise.resolve(null);
            } else {
                return new Promise((resolve, reject) => {
                    db.query('SELECT * FROM job_offers WHERE id = ?', [application.job_offer_id], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(results[0]);  // Assuming `results` is an array and we need the first item
                    });
                });
            }
        });

        const jobOffers = await Promise.all(jobOfferPromises);

        // Filter out null values from the jobOffers array
        const filteredJobOffers = jobOffers.filter(offer => offer !== null);

        console.log("liste des offres : ", filteredJobOffers);
        res.json(filteredJobOffers);

    } catch (err) {
        console.error('Erreur lors de la récupération des candidatures ou des offres d\'emploi:', err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
};
