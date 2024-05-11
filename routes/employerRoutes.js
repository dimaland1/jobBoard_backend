const express = require('express');
const router = express.Router();
const employerController = require('../controllers/EmployerController');
const verifyEmployer = require('../middleware/authMiddleware');

router.get('/employers-offers' , employerController.getEmployersOffers);