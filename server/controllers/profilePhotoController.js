const path = require('path');
const multer = require('multer');

// Configuration de Multer pour enregistrer les fichiers dans le dossier 'user_profile_photos'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/user_profile_photos');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = 'profile-photo-' + uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Méthode du contrôleur pour gérer l'upload de la photo de profil
const uploadProfilePhoto = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Erreur lors de l\'upload de la photo de profil:', err);
      res.status(500).json({ error: 'Erreur lors de l\'upload de la photo de profil' });
    } else {
      const file = req.file; // Fichier envoyé par le client

      // Effectuez les opérations nécessaires pour enregistrer le nom du fichier dans la base de données ou effectuer d'autres traitements
      const fileName = file.filename; // Obtenez le nom de fichier correct

      res.status(200).json({ message: 'Photo de profil téléchargée avec succès', photoFilename: fileName });

    }
  });
};

module.exports = {
  uploadProfilePhoto,
};
