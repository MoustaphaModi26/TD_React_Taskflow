# TaskFlow – Gestionnaire de tâches d'équipe

Application web SPA développée avec **React + Vite** dans le cadre du TP évalué en Architecture Front-End.

## Prérequis

- Node.js >= 18
- npm >= 9

## Installation des dépendances

```bash
npm install
```

## Lancement du serveur de développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

## Build de production

```bash
npm run build
```

---

## Architecture du projet

```
src/
├── components/
│   ├── TaskCard.jsx      # Carte d'affichage d'une tâche (avec <Link> React Router)
│   └── TaskForm.jsx      # Formulaire contrôlé d'ajout de tâche
├── hooks/
│   └── useLocalStorage.js  # Hook personnalisé de persistance (BONUS)
├── layouts/
│   └── Navbar.jsx          # Barre de navigation globale
├── pages/
│   ├── Dashboard.jsx       # Écran principal – liste des tâches
│   └── TaskDetail.jsx      # Écran détail – fiche complète d'une tâche
├── App.jsx                 # Configuration BrowserRouter + Routes
└── main.jsx                # Point d'entrée React