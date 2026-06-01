// pages/Dashboard.jsx
// VERSION FULL-STACK : remplace useLocalStorage par des appels réseau vers le backend

import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard.jsx'
import TaskForm from '../components/TaskForm.jsx'

// L'adresse de notre API backend — le serveur Node.js qui tourne sur le port 5000
const API_URL = 'http://localhost:5000/api/tasks'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f6f9',
    padding: '2rem',
  },
  header: {
    marginBottom: '1.5rem',
  },
  h1: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: '0.25rem',
  },
  sous_titre: {
    color: '#888',
    fontSize: '0.95rem',
  },
  grille: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
  },
  vide: {
    textAlign: 'center',
    color: '#aaa',
    padding: '3rem',
    background: '#fff',
    borderRadius: '12px',
    fontSize: '1rem',
  },
  chargement: {
    textAlign: 'center',
    color: '#888',
    padding: '3rem',
    fontSize: '1rem',
  },
}

function Dashboard() {
  // L'état "tasks" contiendra les tâches récupérées depuis MongoDB
  const [tasks, setTasks] = useState([])
  const [chargement, setChargement] = useState(true)

  // ── Jalon 5.2 : Récupérer les tâches au chargement de la page ──
  // useEffect avec [] = s'exécute UNE SEULE FOIS quand le composant apparaît
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
        setChargement(false)
      })
      .catch((error) => {
        console.error('Erreur de chargement des tâches :', error)
        setChargement(false)
      })
  }, [])

  // ── Jalon 5.3 : Ajouter une tâche via POST ─────────────────────
  const handleAddTask = (nouvelleTache) => {
    // fetch avec POST envoie les données au backend
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // On dit au backend qu'on envoie du JSON
      },
      body: JSON.stringify(nouvelleTache), // Conversion de l'objet JS en texte JSON
    })
      .then((response) => {
        // On vérifie que le backend a répondu avec un succès (code 201)
        if (!response.ok) {
          throw new Error('Erreur lors de la création de la tâche')
        }
        return response.json()
      })
      .then((tacheCreee) => {
        // MongoDB retourne la tâche avec son vrai _id
        // On l'ajoute à l'état React avec le spread operator (immuabilité)
        setTasks([...tasks, tacheCreee])
      })
      .catch((error) => console.error("Erreur d'ajout :", error))
  }

  if (chargement) {
    return <div style={styles.chargement}>Chargement des tâches...</div>
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Tableau de bord</h1>
        <p style={styles.sous_titre}>
          {tasks.length} tâche{tasks.length !== 1 ? 's' : ''} au total
        </p>
      </div>

      <TaskForm onAddTask={handleAddTask} />

      {tasks.length === 0 ? (
        <div style={styles.vide}>Aucune tâche pour le moment. Ajoutez-en une !</div>
      ) : (
        <div style={styles.grille}>
          {tasks.map((tache) => (
            // MongoDB utilise "_id" comme identifiant unique (pas "id")
            <TaskCard key={tache._id} tache={tache} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
