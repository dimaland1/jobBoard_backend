const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const verifyEmployer = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer Token
        const decoded = jwt.verify(token, SECRET_KEY);

        /* exemple de requette :
        {
            "user_type": 'employer',
            "token": "eyJ"
        }
        */

        if (decoded.user_type !== 'employer') {
            return res.status(403).send('Accès refusé : vous devez être employeur pour effectuer cette action.');
        }

        req.user = decoded; // Stocker les informations de l'utilisateur dans l'objet de requête pour un usage ultérieur
        next(); // Passer au prochain middleware
    } catch (error) {
        res.status(401).send('Authentication failed: invalid token');
    }
};
module.exports = verifyEmployer;