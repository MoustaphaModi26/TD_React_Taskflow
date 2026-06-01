# TaskFlow – Projet Full-Stack (React + Node.js/Express + MongoDB)

Projet réalisé dans le cadre du TP évalué

---

## Structure du projet

```
taskflow/
├── TD_React_Taskflow/          ← Projet React (Frontend)
└── Backend_Taskflow/          ← Projet Node.js/Express (Backend)
    ├── models/
    │   └── Task.js
    ├── controllers/
    │   └── taskController.js
    ├── routes/
    │   └── taskRoutes.js
    ├── server.js
    ├── .env
    └── package.json
```

## Étape 1 – Démarrer la base de données MongoDB

### Option A : MongoDB local
Lancez MongoDB sur votre machine. Sur Windows, MongoDB tourne généralement  
en tant que service (il démarre automatiquement).  
Vérifiez avec : `mongod --version`

### Option B : MongoDB Atlas (cloud)
1. Créez un cluster sur [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Récupérez l'URL de connexion (format : `mongodb+srv://...`)
3. Remplacez la valeur de `MONGO_URI` dans le fichier `.env`

---

## Étape 2 – Démarrer le serveur Backend

```bash
# Se placer dans le dossier server
cd server

# Installer les dépendances (express, mongoose, cors, dotenv, nodemon)
npm install

# Démarrer le serveur en mode développement (redémarre automatiquement)
npm run dev
```

Le serveur écoute sur : **http://localhost:5000**  
Pour tester : ouvrez **http://localhost:5000/api/ping** dans votre navigateur

---

## Étape 3 – Démarrer l'interface React (Frontend)

```bash
# Dans un nouveau terminal, se placer dans le dossier client
cd client

# Installer les dépendances React
npm install

# Lancer le serveur de développement React
npm run dev
```

L'interface est accessible sur : **http://localhost:5173**

---

## Variables d'environnement (.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
FRONTEND_URL=http://localhost:5173
```