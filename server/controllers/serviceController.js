const Service = require('../models/serviceModel');

const getServiceById = (req, res) => {
  const annonceId = req.params.id;

  Service.getServiceById(annonceId, (err, service) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'annonce :", err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ error: 'Annonce non trouvée' });
      }
    }
  });
};

const getAllServices = (req, res) => {
  Service.getAllServices((err, services) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      console.log('Annonces récupérées avec succès');
      res.status(200).json(services);
    }
  });
};

const createService = (req, res) => {
  const { title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id } = req.body;

  Service.createService(title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création d\'une nouvelle annonce de service :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    console.log('Nouvelle annonce de service créée avec succès');
    res.status(200).json({ message: 'Annonce de service créée avec succès' });
  });
};

const deleteService = (req, res) => {
  const { id } = req.params;

  Service.deleteService(id, (err, result) => {
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
};

const getServicesByUserId = (req, res) => {
  const userId = req.params.userId;

  Service.getServicesByUserId(userId, (err, services) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    console.log('Annonces récupérées avec succès');
    res.status(200).json(services);
  });
};

const getServiceForEdit = (req, res) => {
    const { id } = req.params;

console.log(id);
  Service.getServiceForEdit(id, (err, service) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'annonce :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    if (!service) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    console.log('Annonce récupérée avec succès');
    res.status(200).json(service);
  });
};

const updateService = (req, res) => {
  const { id } = req.params;
  const { title, type, category, description, price, disponibilite, address, postal_code, img_name, city } = req.body;

  Service.updateService(id, title, type, category, description, price, disponibilite, address, postal_code, img_name, city, (err, result) => {
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
};

module.exports = {
  getServiceById,
  getAllServices,
  createService,
  deleteService,
  getServicesByUserId,
  getServiceForEdit,
  updateService
};
