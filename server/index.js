const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const chatRoutes = require("./routes/chatRoutes");
const profileRoutes = require("./routes/profileRoutes");
const creditsRoutes = require('./routes/creditsRoutes');
const cookieParser = require("cookie-parser");
const authenticate = require("./middleware/authenticate");
const validateRoutes = require('./routes/validateRoutes');


const connection = require('./config/database');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static('public'));

app.use(cookieParser());

app.use(express.json());

// Middleware pour CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Montez les routes d'authentification sur votre application
app.use(authRoutes);




// Montez les routes des utilisateurs sur votre application
app.use('/users', authenticate, userRoutes);

// Montez les routes de contact sur votre application
app.use('/contact', authenticate, contactRoutes);

// Montez les routes de service sur votre application
app.use('/service/annonces', authenticate, serviceRoutes);
app.use('/service',  authenticate,serviceRoutes);

// Utiliser les routes du chat
app.use('/chat', authenticate, chatRoutes);

// Utiliser les routes des credits
app.use('/credits', creditsRoutes);

app.use('/validate', validateRoutes);

// app.use('/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie !');
});


// // //////////////////////////////////////////////////// upload image profil

const multer = require('multer');
const path = require('path');

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

// ...

// Route pour enregistrer la photo de profil d'un utilisateur
app.post('/upload-profile-photo', upload.single('file'), (req, res) => {
  const file = req.file; // Fichier envoyé par le client

  // Effectuez les opérations nécessaires pour enregistrer le nom du fichier dans la base de données ou effectuer d'autres traitements

  res.status(200).json({ message: 'Profile photo uploaded successfully', photoFilename: file.filename });
});

const multerAnn = require('multer');

// Configuration de Multer pour enregistrer les fichiers dans le dossier 'annonce_photos'
const storageAnnonce = multerAnn.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/annonce_photos');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = 'annonce-' + uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const uploadAnnonce = multerAnn({ storage: storageAnnonce });

// ...

// Route pour enregistrer l'image de l'annonce
app.post('/upload-annonce-photo', uploadAnnonce.single('file'), (req, res) => {
  const file = req.file; // Fichier envoyé par le client

  // Effectuez les opérations nécessaires pour enregistrer le nom du fichier dans la base de données ou effectuer d'autres traitements

  res.status(200).json({ message: 'Image de l\'annonce téléchargée avec succès', photoFilename: file.filename });
});

// fin de connexion

process.on('SIGINT', () => {
  connection.end();
  process.exit();
});