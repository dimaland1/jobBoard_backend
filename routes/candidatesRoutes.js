const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/candidatesController');


// retourner toute  les candidatures d'un candidat
//router.get('/:id/applications', candidatesController.getAllApplications);

// retourner une candidature d'un candidat
//router.get('/:id/applications/:id', candidatesController.getApplicationById);

// candidater à une offre
//router.post('/:id/applications', candidatesController.applyToJobOffer);