const express = require('express');
const app = express();
require('dotenv').config();


// Import routes
const jobOffersRoutes = require('./routes/jobOffersRoutes');
const authRoutes = require('./routes/authRoutes');
const employerRoutes = require('./routes/employerRoutes');

// Middleware
app.use(express.json());

// Utilisation des routes
app.use('/job-offers', jobOffersRoutes);
app.use('/auth', authRoutes);
//app.use('/employer', employerRoutes);

const PORT = 3020;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});