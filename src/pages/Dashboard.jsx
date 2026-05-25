import TaskCard from '../components/TaskCard.jsx'
import TaskForm from '../components/TaskForm.jsx'
import useLocalStorage from '../hooks/useLocalStorage.js'


const tachesInitiales = [
  {
    id: 1,
    titre: 'Conception de l\'ontologie',
    description: 'Rédiger les axiomes de base du domaine et définir les relations entre les entités principales.',
    statut: 'A faire',
  },
  {
    id: 2,
    titre: 'Intégration de l\'API REST',
    description: 'Connecter le frontend aux endpoints du backend et gérer les erreurs réseau.',
    statut: 'En cours',
  },
  {
    id: 3,
    titre: 'Rédaction des tests unitaires',
    description: 'Couvrir les fonctions critiques avec Jest et atteindre un taux de couverture de 80%.',
    statut: 'Termine',
  },
]

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
}

function Dashboard() {

  const [tasks, setTasks] = useLocalStorage('taskflow_data', tachesInitiales)


  const handleAddTask = (nouvelleTache) => {

    setTasks([...tasks, nouvelleTache])
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

      {/* Liste des tâches générée via .map() */}
      {tasks.length === 0 ? (
        <div style={styles.vide}>Aucune tâche pour le moment. Ajoutez-en une !</div>
      ) : (
        <div style={styles.grille}>
          {tasks.map((tache) => (
            <TaskCard key={tache.id} tache={tache} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
