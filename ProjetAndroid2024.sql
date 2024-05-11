CREATE TABLE `Candidate` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255), -- Longueur spécifiée
  `first_name` VARCHAR(255), -- Longueur spécifiée
  `nationality` VARCHAR(255), -- Longueur spécifiée
  `birth_date` DATE,
  `phone` VARCHAR(255), -- Longueur spécifiée
  `email` VARCHAR(255), -- Longueur spécifiée
  `city` VARCHAR(255), -- Longueur spécifiée
  `CV_Link` VARCHAR(255),
  `comments` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Valeur par défaut ajoutée
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Valeur par défaut ajoutée
  `password_hash` VARCHAR(255) -- Longueur spécifiée
);

CREATE TABLE `Employer` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `phone` VARCHAR(255), -- Longueur spécifiée
  `email` VARCHAR(255), -- Longueur spécifiée
  `cp` VARCHAR(255), -- Longueur spécifiée
  `address` VARCHAR(255), -- Longueur spécifiée
  `city` VARCHAR(255), -- Longueur spécifiée
  `company_name` VARCHAR(255), -- Longueur spécifiée
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Valeur par défaut ajoutée
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Valeur par défaut ajoutée
  `password_hash` VARCHAR(255) -- Longueur spécifiée
);

CREATE TABLE `public_links` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `employer_id` INT,
  `link` VARCHAR(255)
);

CREATE TABLE `job_offers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `employer_id` INT,
  `title` VARCHAR(255), -- Longueur spécifiée
  `description` TEXT,
  `target_job` VARCHAR(255), -- Longueur spécifiée
  `period` VARCHAR(255), -- Longueur spécifiée
  `remuneration` DECIMAL(10,2), -- Précision spécifiée
  `location` VARCHAR(255), -- Longueur spécifiée
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Valeur par défaut ajoutée
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Valeur par défaut ajoutée
  `status` VARCHAR(255) -- Longueur spécifiée
);

CREATE TABLE `applications` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `candidate_id` INT,
  `job_offer_id` INT,
  `application_date` DATE,
  `motivation_letter_link` VARCHAR(255),
  `status` VARCHAR(255), -- Longueur spécifiée
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Valeur par défaut ajoutée
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Valeur par défaut ajoutée
);

CREATE TABLE `feedbacks` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `application_id` INT,
  `employeur_id` INT,
  `candidat_id` INT,
  `comment` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Valeur par défaut ajoutée
);

ALTER TABLE `public_links` ADD FOREIGN KEY (`employer_id`) REFERENCES `Employer` (`id`);
ALTER TABLE `job_offers` ADD FOREIGN KEY (`employer_id`) REFERENCES `Employer` (`id`);
ALTER TABLE `applications` ADD FOREIGN KEY (`candidate_id`) REFERENCES `Candidate` (`id`);
ALTER TABLE `applications` ADD FOREIGN KEY (`job_offer_id`) REFERENCES `job_offers` (`id`);
ALTER TABLE `feedbacks` ADD FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`);
ALTER TABLE `feedbacks` ADD FOREIGN KEY (`employeur_id`) REFERENCES `Employer` (`id`);
ALTER TABLE `feedbacks` ADD FOREIGN KEY (`candidat_id`) REFERENCES `Candidate` (`id`);

INSERT INTO Candidate (name, first_name, nationality, birth_date, phone, email, city, CV_Link, comments, password_hash)
VALUES ('Doe', 'John', 'Français', '1992-06-15', '1234567890', 'john.doe@example.com', 'Paris', 'http://example.com/cv/johndoe', 'Aucun commentaire.', 'hashmotdepasse');

INSERT INTO Employer (phone, email, city, company_name, password_hash)
VALUES ('0987654321', 'hr@company.com', 'Lyon', 'Compagnie XYZ', 'autrehash');

INSERT INTO job_offers (employer_id, title, description, target_job, period, remuneration, location, status)
VALUES (1, 'Développeur Web', 'Recherche développeur web expérimenté en JavaScript.', 'Développement', '6 mois', 3500.00, 'Lyon', 'Ouvert');

INSERT INTO applications (candidate_id, job_offer_id, application_date, motivation_letter_link, status)
VALUES (1, 1, '2024-05-08', 'http://example.com/motivation/johndoe', 'En attente');

INSERT INTO feedbacks (application_id, employeur_id, candidat_id, comment)
VALUES (1, 1, 1, 'Excellent candidat');
