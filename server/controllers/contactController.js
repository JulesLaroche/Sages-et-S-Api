const connection = require('../config/database');

const createContact = (req, res) => {
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
};

module.exports = {
  createContact,
};
