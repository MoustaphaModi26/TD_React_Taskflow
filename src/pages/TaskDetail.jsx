import { useParams, Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage.js'

const statutConfig = {
  'A faire': { couleur: '#f39c12', fond: '#fff8e7'},
  'En cours': { couleur: '#3498db', fond: '#e8f4fd'},
  'Termine':  { couleur: '#2ecc71', fond: '#eafaf1'},
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f6f9',
    padding: '2rem',
  },
  retour: {
    display: 'inline-block',
    marginBottom: '1.5rem',
    color: '#e94560',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  carte: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '700px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  label: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.35rem',
  },
  valeur: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  titre: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: '1.5rem',
  },
  badge: (statut) => ({
    display: 'inline-block',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '700',
    background: statutConfig[statut]?.fond || '#f0f0f0',
    color: statutConfig[statut]?.couleur || '#333',
    border: `2px solid ${statutConfig[statut]?.couleur || '#ccc'}`,
  }),
  erreur: {
    textAlign: 'center',
    color: '#e94560',
    fontSize: '1.1rem',
    padding: '3rem',
    background: '#fff',
    borderRadius: '12px',
  },
}

function TaskDetail() {

  const { id } = useParams()


  const [tasks] = useLocalStorage('taskflow_data', [])

  const tache = tasks.find((t) => t.id === Number(id))

  // Cas où la tâche n'est pas trouvée
  if (!tache) {
    return (
      <div style={styles.page}>

        <Link to="/" style={styles.retour}>← Retour au tableau de bord</Link>
        <div style={styles.erreur}>
          Tâche introuvable. Elle a peut-être été supprimée.
        </div>
      </div>
    )
  }

  const config = statutConfig[tache.statut]

  return (
    <div style={styles.page}>
      <Link to="/" style={styles.retour}>← Retour au tableau de bord</Link>

      <div style={styles.carte}>
        <div style={styles.titre}>
          {config.emoji} {tache.titre}
        </div>

        <div style={styles.label}>Identifiant</div>
        <div style={styles.valeur}>#{tache.id}</div>

        <div style={styles.label}>Description</div>
        <div style={styles.valeur}>{tache.description || 'Aucune description fournie.'}</div>

        <div style={styles.label}>Statut</div>
        <div>
          <span style={styles.badge(tache.statut)}>{tache.statut}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskDetail
