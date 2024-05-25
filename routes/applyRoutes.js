const express = require('express');
const router = express.Router();
const employerController = require('../controllers/applyController');
const verifyEmployer = require('../middleware/authMiddleware');


// route post pour creer une candidature
router.post('/applications', employerController.createApplication);

// route get qui retoure toutes les candidatures d'un offre d'emploi
router.get('/applications/job/:id', employerController.getApplicationsByJobOfferId);

// route post pour mettre a jour le status d'une candidature
router.put('/applications/update-status/:id', employerController.updateApplicationStatus);

// route put pour mettre a jour le commentaire d'une candidature
router.put('/applications/update-comment/:id', employerController.updateApplicationComment);

// route get qui retourne toutes les candidatures d'un candidat
router.get('/applications/candidate/:id', employerController.getApplicationsByCandidateId);


module.exports = router;