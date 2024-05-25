const express = require('express');
const router = express.Router();
const jobOffersController = require('../controllers/jobOffersController');
const verifyEmployer = require('../middleware/authMiddleware');

// route post pour creer une offre d'emploi
router.post('/', verifyEmployer, jobOffersController.createJobOffer); 

// route get qui retourne toutes les offres d'emploi
router.get('/', jobOffersController.getAllJobOffers);

// route get qui retourne toutes les offres d'emploi par ville et par titre de poste
router.get('/:city/:jobTitle', jobOffersController.getJobOffersByCityAndJobTitle);

// route get qui retourne un offre d'emploi par son id
router.get('/:id', jobOffersController.getJobOfferById);

// route put pour mettre a jour une offre d'emploi
router.put('/:id', jobOffersController.updateJobOffer); 

// route delete pour supprimer une offre d'emploi
router.delete('/:id', jobOffersController.deleteJobOffer);

// Voir les candidatures pour une offre spécifique
//router.get("/:id/applications");


module.exports = router;
