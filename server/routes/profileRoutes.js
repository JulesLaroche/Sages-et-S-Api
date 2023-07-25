const express = require('express');
const multer = require('multer');
const path = require('path');
const profilePhotoController = require('../controllers/profilePhotoController');

const router = express.Router();

// Configuration de Multer pour enregistrer les fichiers dans le dossier 'user_profile_photos'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/user_profile_photos');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = 'profile-photo-' + uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Route pour enregistrer la photo de profil d'un utilisateur
router.post('/', upload.single('file'), profilePhotoController.uploadProfilePhoto);

module.exports = router;
