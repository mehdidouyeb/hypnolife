# HypnoLife - Application Web d'Hypnothérapie

Une application web responsive et modulaire pour HypnoLife, spécialisée dans l'hypnothérapie.

## Fonctionnalités

- Page d'accueil élégante avec un message de bienvenue
- Page de diagnostic avec différentes catégories de services
- Design épuré, professionnel et responsive
- Interface utilisateur intuitive et attrayante

## Technologies utilisées

- Backend: Flask (Python)
- Frontend: HTML5, CSS3, JavaScript
- Polices: Google Fonts (Montserrat, Raleway)
- Icônes: Font Awesome

## Prérequis

- Python 3.7 ou supérieur
- pip (gestionnaire de paquets Python)

## Installation

1. Clonez ce dépôt

```bash
git clone https://github.com/votre-nom/hypnolife.git
cd hypnolife
```

2. Créez un environnement virtuel (recommandé)

```bash
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
```

3. Installez les dépendances

```bash
pip install -r requirements.txt
```

4. Lancez l'application

```bash
python app.py
```

5. Accédez à l'application dans votre navigateur

```
http://127.0.0.1:5000
```

## Déploiement

Cette application peut être facilement déployée sur différentes plateformes comme:

- Heroku
- PythonAnywhere
- AWS
- DigitalOcean

Consultez la documentation de la plateforme choisie pour les instructions spécifiques.

## Structure du projet

```
hypnolife/
├── app.py                  # Point d'entrée de l'application Flask
├── requirements.txt        # Dépendances du projet
├── static/                 # Fichiers statiques
│   ├── css/                # Feuilles de style
│   │   └── style.css       # Style principal
│   ├── js/                 # Scripts JavaScript
│   │   └── main.js         # Script principal
│   └── images/             # Images et ressources visuelles
└── templates/              # Templates Jinja2
    ├── index.html          # Page d'accueil
    └── diagnostic.html     # Page de diagnostic
```

## Licence

MIT

## Contact

Pour toute question ou suggestion, veuillez nous contacter à [contact@hypnolife.fr](mailto:contact@hypnolife.fr).
# hypnolife
