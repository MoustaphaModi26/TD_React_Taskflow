import { Link } from 'react-router-dom'

// Couleurs associées à chaque statut de tâche
const statutConfig = {
  'A faire': { couleur: '#f39c12', fond: '#fff8e7'},
  'En cours': { couleur: '#3498db', fond: '#e8f4fd'},
  'Termine':  { couleur: '#2ecc71', fond: '#eafaf1'},
}

const styles = {
  card: {
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '1.25rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
    color: 'inherit',
  },
  titre: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.875rem',
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.4',
    // Tronquer le texte si trop long
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  badge: (statut) => ({
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.78rem',
    fontWeight: '600',
    background: statutConfig[statut]?.fond || '#f0f0f0',
    color: statutConfig[statut]?.couleur || '#333',
    border: `1px solid ${statutConfig[statut]?.couleur || '#ccc'}`,
  }),
}

function TaskCard({ tache }) {
  const config = statutConfig[tache.statut]

  return (
  
    <Link
      to={`/task/${tache.id}`}
      style={styles.card}
      
    
    >
      <div style={styles.titre}>
        {config.emoji} {tache.titre}
      </div>
      <div style={styles.description}>{tache.description}</div>
      <span style={styles.badge(tache.statut)}>{tache.statut}</span>
    </Link>
  )
}

export default TaskCard
