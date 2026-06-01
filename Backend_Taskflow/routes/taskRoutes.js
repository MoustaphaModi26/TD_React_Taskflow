// Ce fichier définit les "adresses" (URLs) de l'API et les relie aux contrôleurs

const express = require('express');

// express.Router() crée un mini-routeur indépendant qu'on pourra brancher dans server.js
const router = express.Router();

// On importe les 4 fonctions du contrôleur
const {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');

router.get('/', getAllTasks);   // GET    /api/tasks        → récupérer toutes les tâches
router.post('/', createTask);  // POST   /api/tasks        → créer une nouvelle tâche
router.put('/:id', updateTaskStatus);  // PUT    /api/tasks/:id    → modifier le statut d'une tâche spécifique
router.delete('/:id', deleteTask);  // DELETE /api/tasks/:id    → supprimer une tâche spécifique

module.exports = router;
