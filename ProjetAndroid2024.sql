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
