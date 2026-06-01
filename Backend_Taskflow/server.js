// server.js
// C'est le point d'entrée de toute l'application backend
// Il configure et démarre le serveur Express

// ── 1. Chargement des modules ──────────────────────────────────
// dotenv lit le fichier .env et injecte ses variables dans process.env
// IMPORTANT : doit être appelé EN PREMIER, avant tout le reste
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// On importe notre fichier de routes
const taskRoutes = require('./routes/taskRoutes');

// ── 2. Création de l'application Express ───────────────────────
const app = express();

// ── 3. Configuration des Middlewares (Jalon 4) ─────────────────
// Un middleware = une fonction qui s'exécute à chaque requête, AVANT le contrôleur

// express.json() permet de lire le corps (body) des requêtes POST/PUT en JSON
// Sans ça, req.body serait undefined dans les contrôleurs
app.use(express.json());

// cors() gère la politique "Same-Origin"
// Sans CORS, le navigateur bloquerait les requêtes de React (port 5173)
// vers notre API (port 5000) car ce sont deux origines différentes

// Bonus Ingénierie : on restreint CORS à l'URL exacte du frontend
// process.env.FRONTEND_URL est lu depuis le fichier .env
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Seul http://localhost:5173 est autorisé
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  })
);

// ── 4. Route de test (Jalon 1) ─────────────────────────────────
// Cette route permet de vérifier que le serveur tourne correctement
// On peut la tester dans le navigateur : http://localhost:5000/api/ping
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'Serveur TaskFlow operationnel' });
});

// ── 5. Branchement des routes des tâches (Jalon 3) ─────────────
// Toutes les routes définies dans taskRoutes.js seront préfixées par "/api/tasks"
// Ex: router.get('/') devient GET /api/tasks
//     router.post('/') devient POST /api/tasks
//     router.put('/:id') devient PUT /api/tasks/:id
app.use('/api/tasks', taskRoutes);

// ── 6. Connexion à MongoDB et démarrage du serveur ─────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect() établit la connexion à la base de données
// On ne démarre le serveur QU'APRÈS la connexion réussie à MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // La promesse (.then) s'exécute si la connexion réussit
    console.log('✅ Connexion à MongoDB réussie !');

    // app.listen() démarre le serveur et l'écoute sur le PORT défini
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`🔗 Test disponible sur http://localhost:${PORT}/api/ping`);
    });
  })
  .catch((error) => {
    // La promesse (.catch) s'exécute si la connexion échoue
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
    process.exit(1); // On arrête le programme si on ne peut pas se connecter à la BD
  });
