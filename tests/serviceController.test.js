const http = require('http');
const { app, server } = require('../server');
const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const secretKey = "jules"; // Utilisez la même clé secrète que dans le middleware

// Fonction pour générer un jeton JWT valide
function generateValidJWTToken(userId) {
  const payload = {
    userId: userId,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

describe('Service Controller Tests', () => {
  it('should return all services', async () => {
    // Remplacez 123 par l'identifiant de l'utilisateur authentifié
    const userId = 82;
    const token = generateValidJWTToken(userId);

    const res = await request(app)
    .get('/service/annonces') // ou '/service'
    .set('Authorization', `Bearer ${token}`);

    // Utilisation de l'assertion expect de Chai
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});