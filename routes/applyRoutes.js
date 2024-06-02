const express = require('express');
const router = express.Router();
const applyController = require('../controllers/applyController');
const verifyEmployer = require('../middleware/authMiddleware');


// route post pour creer une candidature
router.post('/', applyController.createApplication);

// route get qui retoure toutes les candidatures d'un offre d'emploi
router.get('/job/:id', applyController.getApplicationsByJobOfferId);

// route post pour mettre a jour le status d'une candidature
router.put('/update-status/:id', applyController.updateApplicationStatus);

// route put pour mettre a jour le commentaire d'une candidature
router.put('/update-comment/:id', applyController.updateApplicationComment);

// route get qui retourne toutes les candidatures d'un candidat
router.get('/candidate/:id', applyController.getApplicationsByCandidateId);

module.exports = router;