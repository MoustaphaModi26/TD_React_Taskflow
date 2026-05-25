import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './layouts/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TaskDetail from './pages/TaskDetail.jsx'

function App() {
  return (

    <BrowserRouter>

      <Navbar />

      {/* Déclaration de l'arbre des routes */}
      <Routes>
        {/* Route racine : affiche le tableau de bord */}
        <Route path="/" element={<Dashboard />} />

        {/* Route dynamique : affiche la fiche détaillée d'une tâche via son id */}
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
