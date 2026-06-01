// Ce fichier définit la structure (le "schéma") d'une tâche dans MongoDB

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    
    titre: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    },

    
    description: {
      type: String,
    },

    // Le statut doit être l'une des 3 valeurs autorisées, par défaut 'A faire'
    statut: {
      type: String,
      enum: {
        values: ['A faire', 'En cours', 'Termine'],
        message: 'Le statut doit être : A faire, En cours ou Termine',
      },
      default: 'A faire',
    },
  },
  {
    // Ajoute automatiquement createdAt et updatedAt
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
