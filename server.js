const express = require('express');
const app = express();
require('dotenv').config();

// ajouter cors
const cors = require('cors');

// Import routes
const jobOffersRoutes = require('./routes/jobOffersRoutes');
const authRoutes = require('./routes/authRoutes');
const applyRoutes = require('./routes/applyRoutes');

// Utilisation de cors
app.use(cors());

// Middleware
app.use(express.json());

// Utilisation des routes
app.use('/job-offers', jobOffersRoutes);
app.use('/auth', authRoutes);
app.use('/apply', applyRoutes);

const PORT = 3020;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});