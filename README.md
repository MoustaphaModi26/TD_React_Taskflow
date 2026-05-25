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
```

## Jalons couverts

| Jalon | Description | Points |
|-------|-------------|--------|
| 1 | Environnement Vite + architecture des dossiers | 3 pts |
| 2 | Composants TaskCard + itération .map() avec key={id} | 4 pts |
| 3 | Formulaire contrôlé + Lifting State Up + Spread Operator | 5 pts |
| 4 | useEffect + persistance localStorage | 4 pts |
| 5 | React Router, BrowserRouter, useParams, <Link> | 4 pts |
| **Bonus** | Hook personnalisé `useLocalStorage.js` | +2 pts |

## Choix techniques notables

- **Immuabilité** : l'état n'est jamais muté directement. Toute modification passe par `setTasks([...tasks, nouvelleTache])`.
- **Composants contrôlés** : chaque champ du formulaire est lié à un état React via `value` + `onChange`.
- **Navigation SPA** : aucune balise `<a href>` n'est utilisée pour la navigation interne. Tout passe par `<Link>` de React Router.
- **Clé unique** : le `.map()` utilise `tache.id` comme `key`, jamais l'index du tableau.
