# Multivers Explorer

Mini-application React réalisée avec Vite et TypeScript dans le cadre d’un TP noté.

## Objectif

L’application permet de :

- consulter une liste paginée de personnages de l’univers Rick and Morty
- accéder à une page de détail pour chaque personnage
- remplir un formulaire d’évaluation avec validation stricte

## Technologies utilisées

- React
- TypeScript
- Vite
- React Router DOM
- Formik
- Zod
- zod-formik-adapter

## Installation

```bash
npm install
npm run dev
```

## Routes disponibles
- / : page d’accueil avec la liste paginée des personnages
- /character/:id : page de détail d’un personnage avec formulaire d’évaluation


## Fonctionnalités

Page d’accueil

- récupération des personnages depuis l’API Rick and Morty
- affichage d’une grille de personnages
- gestion des états de chargement et d’erreur
- pagination avec boutons Précédent / Suivant

Page détail

- récupération de l’identifiant avec useParams
- affichage des informations détaillées du personnage
- gestion du chargement et des erreurs
- Formulaire d’évaluation
- validation avec Formik + Zod

- contraintes :

	- nom obligatoire, minimum 3 caractères
	- email obligatoire, format valide
	- note obligatoire, entre 1 et 5
	- commentaire facultatif, maximum 200 caractères
	- affichage des erreurs sous les champs
	- affichage des données validées dans une modale <dialog>
	- réinitialisation du formulaire après soumission

API utilisée

API publique Rick and Morty :

https://rickandmortyapi.com/

Structure du projet

src/
  components/
  pages/
  services/
  types/
