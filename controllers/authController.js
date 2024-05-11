const db = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY;

// Inscription d'un utilisateur
exports.registerUser = async (req, res) => {
    const {
        name,
        first_name,
        nationality,
        birth_date,
        phone,
        email, 
        city,
        CV_link,
        password,
        address,
        cp,
        link,
        companyName,
        userType } = req.body;
    console.log("inscription de ", req.body)
    // formater la date de naissance pour qu'elle soit compatible avec MySQL
    const formattedBirthdate = birth_date ? new Date(birth_date).toISOString().slice(0, 19).replace('T', ' ') : null;

    console.log("formattedBirthdate", formattedBirthdate)
    
    if (!email && !password || (userType === 'employer' && !companyName))
        {
            console.log("Les données requises ne sont pas fournies.")
            return res.status(400).send("Les données requises ne sont pas fournies.");
        }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        const table = userType === 'candidate' ? 'Candidate' : 'Employer';
    
        if(userType === "candidate" ){
            const sql = `INSERT INTO ${table} (
                name,
                first_name,
                nationality,
                birth_date,
                phone, 
                email,
                city,
                CV_Link, 
                password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
            db.query(sql, [name, first_name, nationality, formattedBirthdate, phone, email, city, CV_link, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'inscription:', err);
                    res.status(500).send('Erreur lors de l\'inscription');
                } else {
                    console.log("Utilisateur enregistré avec succès")
                    res.status(201).send('Utilisateur enregistré avec succès');
                }
            });
        }

        if(userType === "employer"){
            const sql = `INSERT INTO ${table} (
                phone,
                email,
                cp,
                address,
                city,
                company_name,
                password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
            db.query(sql, [phone,
                email,
                cp,
                address,
                city,
                companyName,
                hashedPassword
            ], (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'inscription:', err);
                    res.status(500).send('Erreur lors de l\'inscription');
                } else {
                    console.log("Employeur enregistré avec succès")
                    res.status(201).send('Employeur enregistré avec succès');
                }
            });
        }

    } catch (error) {
        res.status(500).send("Erreur lors du traitement de la requête.");
    }
};

// Connexion d'un utilisateur
exports.loginUser = (req, res) => {
    console.log("connexion de ", req.body.email)
    const { email, password, userType } = req.body;
    console.log("usertype", userType)
    if (!email || !password) {
        console.log("email ou mot de passe manquant")
        return res.status(400).send("Email et mot de passe sont requis.");
    }

    const table = userType === 'candidate' ? 'Candidate' : 'Employer';
    db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], async (err, results) => {
        if (err) {
            console.error('Erreur lors de la connexion:', err);
            res.status(500).send('Erreur lors de la connexion');
        } else if (results.length === 0) {
            console.log("Utilisateur non trouvé")
            res.status(401).send('Utilisateur non trouvé');
        } else {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password_hash);
            if (match) {
                const token = jwt.sign({ id: user.id, userType }, JWT_SECRET, { expiresIn: '24h' });
                console.log("name", user)
                res.json({ nom_utilisateur: user.name, token : token });
            } else {
                res.status(401).send('Mot de passe incorrect');
            }
        }
    });
};
