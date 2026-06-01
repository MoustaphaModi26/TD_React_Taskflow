const Task = require('../models/Task');

// LIRE toutes les tâches (GET /api/tasks) ─────────────────
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error: error.message });
  }
};

// CRÉE une nouvelle tâche (POST /api/tasks)
const createTask = async (req, res) => {
  try {
    // req.body contient { titre, description, statut } envoyés par React
    const newTask = new Task({
      titre: req.body.titre,
      description: req.body.description,
      statut: req.body.statut,
    });

    const savedTask = await newTask.save();

    // Code 201 = "Created" : ressource créée avec succès
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

// MODIFIE le statut d'une tâche (PUT /api/tasks/:id) ─────
const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { statut: req.body.statut },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tâche introuvable' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Mise à jour impossible', error: error.message });
  }
};

// SUPPRIMER une tâche (DELETE /api/tasks/:id) ─────────────
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tâche introuvable' });
    }

    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Suppression impossible', error: error.message });
  }
};

module.exports = { getAllTasks, createTask, updateTaskStatus, deleteTask };
