// VERSION FULL-STACK : on remplace localStorage par des appels réseau vers le backend

import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

// L'URL de base de notre API backend
// On la définit ici pour ne pas la réécrire à chaque fois
const API_URL = 'http://localhost:5000/api/tasks';

function Dashboard() {
  // L'état "tasks" contiendra la liste des tâches récupérées depuis MongoDB
  const [tasks, setTasks] = useState([]);


  // useEffect avec tableau vide [] = s'exécute UNE SEULE FOIS au chargement
  useEffect(() => {
    // fetch() envoie une requête HTTP GET vers notre API
    fetch(API_URL)
      .then((response) => response.json()) // On convertit la réponse en objet JS
      .then((data) => setTasks(data))       // On met les données dans l'état React
      .catch((error) => console.error('Erreur de chargement des tâches :', error));
  }, []);

  // Ajouter une tâche via POST
  const handleAddTask = (nouvelleTache) => {
    // fetch avec la méthode POST envoie des données au backend
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // On dit au backend qu'on envoie du JSON
      },
      body: JSON.stringify(nouvelleTache), // On convertit l'objet JS en chaîne JSON
    })
      .then((response) => {
        // On vérifie que le backend a répondu avec un succès (code 201)
        if (!response.ok) {
          throw new Error('Erreur lors de la création de la tâche');
        }
        return response.json();
      })
      .then((taskCreee) => {
        // On ajoute la tâche (retournée par MongoDB, avec son vrai _id)
        // dans l'état React — en respectant l'immuabilité avec le spread operator
        setTasks([...tasks, taskCreee]);
      })
      .catch((error) => console.error('Erreur d\'ajout :', error));
  };

  return (
    <div>
      <h1>TaskFlow – Tableau de bord</h1>
      <TaskForm onAddTask={handleAddTask} />
      <div className="task-list">
        {tasks.map((task) => (
          // MongoDB utilise "_id"
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
