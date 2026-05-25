import { Link } from 'react-router-dom'

const styles = {
  nav: {
    background: '#1a1a2e',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  logo: {
    color: '#e94560',
    fontSize: '1.5rem',
    fontWeight: '700',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  tagline: {
    color: '#a0a0b0',
    fontSize: '0.85rem',
    marginLeft: '1rem',
    fontStyle: 'italic',
  },
}

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        TaskFlow
      </Link>
      <span style={styles.tagline}>Gestionnaire de tâches d'équipe</span>
    </nav>
  )
}

export default Navbar
