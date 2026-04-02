# HustleHard 🚀

Bienvenue dans le dépôt du frontend de **HustleHard**, un projet personnel de suivi de productivité, d'habitudes et d'objectifs.

## 📝 Description du Projet :

HustleHard est une application complète conçue pour m'aider à rester organisé et concentré sur ce qui compte. Elle a pour but de fournir une visibilité claire sur mes accomplissements quotidiens et mes ambitions à plus long terme.

### Fonctionnalités principales :
- **Dashboard :** Vue d'ensemble de mes activités, de la journée actuelle et de mon progrès.
- **Habitudes (Habits) :** Suivi quotidien de la mise en place de nouvelles habitudes.
- **Tâches (Tasks) :** Gestion de ma to-do list journalière.
- **Objectifs (Goals) :** Planification d'objectifs à court, moyen ou long terme.
- **Programmes (Programs) :** Mise en place et suivi de parcours spécifiques.
- **Analyses (Analysis) :** Statistiques et représentations visuelles de mes performances.
- **Historique (History) :** Consultation des actions et accomplissements passés.
- **Profil (Profile) :** Gestion de mon compte utilisateur et de mes préférences.

## 🌿 Architecture des Branches (Git)

Ce dépôt est structuré autour de plusieurs branches afin de séparer les environnements et de faciliter le développement :

- `main` : La branche principale de production (et de synchronisation globale).
- `frontend` : La branche actuelle, dédiée exclusivement au développement de l'interface utilisateur en React.
- `backend` (disponible sur le remote) : Contient l'API et la logique côté serveur de l'application (Java / Spring boot).

## 🛠 Stack Technique

L'application côté client (Frontend) utilise les technologies modernes suivantes :
- **Framework :** [React](https://react.dev/) (v19)
- **Routage :** [React Router](https://reactrouter.com/) (v7)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **Outil de build (Bundler) :** [Vite](https://vitejs.dev/)
- **Stylisation :** CSS Modules (fichiers `.module.css` par composant)
- **Gestion de l'état :** L'état est géré globalement grâce à un contexte dédié pour chaque fonctionnalité (`HabitsContext`, `TasksContext`, `GoalsContext`, etc.).


## 📂 Structure du projet Frontend

```text
src/
├── assets/         # Images, icônes et autres ressources statiques
├── components/     # Composants React réutilisables (UI)
├── context/        # Contexte global React pour le state management (Habits, Tasks...)
├── layouts/        # Agencements structurels de la page (Barre latérale, Navigation...)
├── pages/          # Vues principales de l'application (Dashboard, Habits, Goals...)
├── styles/         # Fichiers CSS globaux
├── App.tsx         # Point d'entrée de l'application (Routing)
└── main.tsx        # Fichier d'initialisation de React
```

---
*Projet personnel développé pour l'amélioration continue et l'optimisation des performances quotidiennes.*
