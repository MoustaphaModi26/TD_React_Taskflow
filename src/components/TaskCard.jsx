// components/TaskCard.jsx
// Affiche une carte pour chaque tâche
// MODIFICATION : on utilise tache._id (identifiant MongoDB) au lieu de tache.id

import { Link } from 'react-router-dom'

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
  return (
    // tache._id = l'identifiant unique généré par MongoDB
    // C'est une chaîne de caractères comme "684f2a3b1c9e4d0012345678"
    <Link
      to={`/task/${tache._id}`}
      style={styles.card}
    >
      <div style={styles.titre}>{tache.titre}</div>
      <div style={styles.description}>{tache.description}</div>
      <span style={styles.badge(tache.statut)}>{tache.statut}</span>
    </Link>
  )
}

export default TaskCard
