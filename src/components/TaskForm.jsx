import { useState } from 'react'

const styles = {
  formWrapper: {
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  titre: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '1rem',
  },
  champ: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#444',
    marginBottom: '0.35rem',
  },
  input: {
    padding: '0.6rem 0.9rem',
    border: '1px solid #d0d0d0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  bouton: {
    background: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.7rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
}

// État initial du formulaire — permet de réinitialiser facilement
const etatVide = { titre: '', description: '', statut: 'A faire' }

function TaskForm({ onAddTask }) {
  // Composant contrôlé : chaque champ a son propre état React
  const [formData, setFormData] = useState(etatVide)

  // Gestionnaire générique : met à jour le bon champ selon son attribut "name"
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    // Bloquer le comportement par défaut du navigateur (rechargement de page)
    e.preventDefault()

    if (!formData.titre.trim()) return // Validation minimale

    // Création d'un nouvel objet tâche avec un identifiant unique
    const nouvelleTache = {
      titre: formData.titre.trim(),
      description: formData.description.trim(),
      statut: formData.statut,
    }

    // Remontée d'état (Lifting State Up) : on passe la tâche au parent via le callback
    onAddTask(nouvelleTache)

    // Réinitialisation du formulaire après soumission
    setFormData(etatVide)
  }

  return (
    <div style={styles.formWrapper}>
      <div style={styles.titre}>Ajouter une nouvelle tâche</div>

      <form onSubmit={handleSubmit}>
        <div style={styles.champ}>
          <label style={styles.label} htmlFor="titre">Titre *</label>
          <input
            style={styles.input}
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            placeholder="Ex : Conception de l'ontologie"
            required
          />
        </div>

        <div style={styles.champ}>
          <label style={styles.label} htmlFor="description">Description</label>
          <textarea
            style={{ ...styles.input, resize: 'vertical', minHeight: '80px' }}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez la tâche en détail..."
          />
        </div>

        <div style={styles.champ}>
          <label style={styles.label} htmlFor="statut">Statut initial</label>
          <select
            style={styles.input}
            id="statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
          >
            <option value="A faire">A faire</option>
            <option value="En cours">En cours</option>
            <option value="Termine">Termine</option>
          </select>
        </div>

        <button
          type="submit"
          style={styles.bouton}
          onMouseEnter={e => e.currentTarget.style.background = '#c0392b'}
          onMouseLeave={e => e.currentTarget.style.background = '#e94560'}
        >
          Ajouter la tâche
        </button>
      </form>
    </div>
  )
}

export default TaskForm
