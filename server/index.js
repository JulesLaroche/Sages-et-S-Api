const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

//////////////////////////////////////////////////// Connexion a ma base

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bdsages',
});

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static('public'));
//////////////////////////////////////////////////// CORS sur l'appli

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());





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



//////////////////////////////////////////////////// USER

//////////////////////////////////////////////////// Requete post création user 

app.post('/users', async (req, res) => { // Ajoutez le mot-clé 'async' pour pouvoir utiliser 'await'
  const query = `INSERT INTO users (id, firstname, lastname, email, category, password) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [req.body.id, req.body.firstname, req.body.lastname, req.body.email,req.body.category , req.body.password];

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hachez le mot de passe avec bcryptjs
    values[5] = hashedPassword;

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Erreur lors de la création d\'un nouvel utilisateur :', err);
        res.status(500).json({ error: 'Erreur serveur' });
        return;
      }

      console.log('Nouvel utilisateur créé avec succès');
      res.status(200).json({ message: 'Utilisateur créé avec succès' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

//////////////////////////////////////////////////// Delete USER

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Effectuer les opérations nécessaires pour supprimer le compte utilisateur avec l'ID userId

    // Exemple de code pour supprimer le compte utilisateur de la base de données
    await connection.query('DELETE FROM users WHERE id = ?', userId);

    res.sendStatus(200); // Envoyer une réponse réussie

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


//////////////////////////////////////////////////// Requete post connexion user 

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  const values = [email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche de l\'utilisateur :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Identifiants invalides' });
      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
        return;
      }

      if (!passwordMatch) {
        res.status(401).json({ error: 'Identifiants invalides' });
        return;
      }

      res.status(200).json({ message: 'Connexion réussie', userId: user.id });
    });
  });
});

//////////////////////////////////////////////////// Requete post recherche tous les user 

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  const sql = 'SELECT * FROM users WHERE id = ?';
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      if (result.length > 0) {
        const user = result[0];
        res.json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    }
  });
});


app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

//////////////////////////////////////////////////// Requete update sur le profile user 

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, address, postal_code, city, category, content, img_name } = req.body;
  console.log(img_name);
  const query = `
    UPDATE users
    SET firstname = ?, lastname = ?, address = ?, postal_code = ?, city = ?, category = ?, content = ?, img_name = ?
    WHERE id = ?
  `;
  const values = [firstname, lastname, address, postal_code, city, category, content, img_name, id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    console.log('Utilisateur mis à jour avec succès');
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
  });
});

//////////////////////////////////////////////////// upload image profil


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

















//////////////////////////////////////////////////// FORMULAIRE CONTACT 
//////////////////////////////////////////////////// Requete post de mon formulaire contact 

app.post('/contact', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const query = `INSERT INTO contact (firstname, lastname, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
  const values = [firstName, lastName, email, phone, message];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création d\'un nouveau contact :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    console.log('Nouveau contact créé avec succès');
    res.status(200).json({ message: 'Contact créé avec succès' });
  });
});




////////////////////////////////////////////////////  ANNONCE
//////////////////////////////////////////////////// Recupère l'id dans services
app.get('/services/user/:id', (req, res) => {
  const annonceId = req.params.id;

  const sql = 'SELECT user_id, img_name FROM services WHERE id = ?';
  connection.query(sql, [annonceId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'user_id et de l'img_name :", err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      if (result.length > 0) {
        const { user_id, img_name } = result[0];
        res.json({ user_id, img_name });
      } else {
        res.status(404).json({ error: 'Annonce non trouvée' });
      }
    }
  });
});

//////////////////////////////////////////////////// Recupère l'annonce avec l'id annonce
app.get('/service/annonces/:id', (req, res) => {
  const annonceId = req.params.id;

  const query = `SELECT id, title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id FROM services WHERE id = ?`;

  connection.query(query, [annonceId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'annonce :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Annonce non trouvée' });
      return;
    }

    const annonce = results[0];
    console.log('Annonce récupérée avec succès');
    res.status(200).json(annonce);
  });
});

//////////////////////////////////////////////////// Recupère toutes les annonces
app.get('/service/annonces', (req, res) => {
  const query = `SELECT id, title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id FROM services`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    console.log('Annonces récupérées avec succès');
    res.status(200).json(results);
  });
});

//////////////////////////////////////////////////// Récupère les informations d'une annonce par ID
app.get('/services/user/:id', (req, res) => {
  const annonceId = req.params.id;

  const sql = 'SELECT services.id, services.title, services.description, services.type, services.category, services.postal_code, services.city, services.disponibilite, services.price, users.firstname, users.img_name FROM services INNER JOIN users ON services.user_id = users.id WHERE services.id = ?';
  connection.query(sql, [annonceId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'annonce :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      if (result.length > 0) {
        const { id, title, description, type, category, postal_code, city, disponibilite, price, firstname, img_name } = result[0];
        res.json({ id, title, description, type, category, postal_code, city, disponibilite, price, user: { firstname, img_name } });
      } else {
        res.status(404).json({ error: 'Annonce non trouvée' });
      }
    }
  });
});

//////////////////////////////////////////////////// Requete post de mes annonces

app.post('/service', (req, res) => {
  const { title, type, category, description, price, disponibilite, address, postal_code,img_name, city, user_id } = req.body;

  const query = `INSERT INTO services (title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [title, type, category, description, price, disponibilite, address, postal_code,img_name, city, user_id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création d\'une nouvelle annonce de service :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    console.log('Nouvelle annonce de service créée avec succès');
    res.status(200).json({ message: 'Annonce de service créée avec succès' });
  });
});

//////////////////////////////////////////////////// Requete delete de mes annonces
app.delete('/service/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM services WHERE id = ?`;
  const values = [id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'annonce de service :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'L\'annonce spécifiée est introuvable.' });
    } else {
      console.log('Annonce de service supprimée avec succès');
      res.status(200).json({ message: 'L\'annonce de service a été supprimée avec succès.' });
    }
  });
});

//////////////////////////////////////////////////// Requete get de mes annonces

app.get('/service/user/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `SELECT id, title, type, category, description, price, disponibilite, address, postal_code, img_name, city FROM services WHERE user_id = ?`;
  const values = [userId];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    console.log('Annonces récupérées avec succès');
    res.status(200).json(results);
  });
});


//////////////////////////////////////////////////// Requete get de mes annonces pour modifier annonce
// GET /service/:id
app.get('/service/:id', (req, res) => {
  const { id } = req.params;

  const query = `SELECT id, title, type, category, description, price, disponibilite, address, postal_code, img_name ,city FROM services WHERE id = ?`;
  const values = [id];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'annonce :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    console.log('Annonce récupérée avec succès');
    res.status(200).json(results[0]);
  });
});

//////////////////////////////////////////////////// Requete put de mes annonces pour modifier annonce

app.put('/service/:id', (req, res) => {
  const { id } = req.params;
  const { title, type, category, description, price, disponibilite, address, postal_code, img_name, city } = req.body;

  const query = `UPDATE services SET title = ?, type = ?, category = ?, description = ?, price = ?, disponibilite = ?, address = ?, postal_code = ?, img_name = ?, city = ? WHERE id = ?`;
  const values = [title, type, category, description, price, disponibilite, address, postal_code, img_name, city, id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification de l\'annonce de service :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    console.log('Annonce de service modifiée avec succès');
    res.status(200).json({ message: 'Annonce de service modifiée avec succès' });
  });
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



//////////////////////////////////////////////////// CHAT
//////////////////////////////////////////////////// Requete post message

app.post('/chat', (req, res) => {
  const { user_id, creator_id, message } = req.body;
  const created_at = new Date();

  const query = 'INSERT INTO chat (user_id, creator_id, message, created_at) VALUES (?, ?, ?, ?)';
  connection.query(query, [user_id, creator_id, message, created_at], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du message:', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du message' });
    } else {
      console.log('Message ajouté avec succès');
      res.sendStatus(200);
    }
  });
});

//////////////////////////////////////////////////// Requete get message
app.get('/chat', (req, res) => {
  const query = 'SELECT * FROM chat';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    } else {
      console.log('Messages récupérés avec succès');
      res.json(results);
    }
  });
});






// fin de connexion

process.on('SIGINT', () => {
  connection.end();
  process.exit();
});
