const express = require('express');
const router = express.Router();
const jobOffersController = require('../controllers/jobOffersController');
const verifyEmployer = require('../middleware/authMiddleware');

router.post('/', verifyEmployer, jobOffersController.createJobOffer); 
router.get('/', jobOffersController.getAllJobOffers);
router.get('/:city/:jobTitle', jobOffersController.getJobOffersByCityAndJobTitle);
router.get('/:id', jobOffersController.getJobOfferById);
router.put('/:id', jobOffersController.updateJobOffer); 
router.delete('/:id', jobOffersController.deleteJobOffer);

// Voir les candidatures pour une offre spécifique
//router.get("/:id/applications");


module.exports = router;
