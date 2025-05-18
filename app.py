from flask import Flask, render_template, request, session, jsonify

app = Flask(__name__)
app.secret_key = 'hypnolife_secret_key'  # Clé nécessaire pour utiliser les sessions


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/personal-info')
def personal_info():
    return render_template('personal_info.html')


@app.route('/diagnostic')
def diagnostic():
    return render_template('diagnostic.html')


@app.route('/questionnaire/<category>')
def questionnaire(category):
    # On pourrait charger différentes questions selon la catégorie
    return render_template('questionnaire.html', category=category)


@app.route('/save_answer', methods=['POST'])
def save_answer():
    # Enregistrement des réponses (dans un scénario réel, on stockerait dans une BD)
    if request.method == 'POST':
        data = request.json
        # Dans une véritable application, on sauvegarderait cela en base de données
        # Pour le moment, simplement retourner OK
        return jsonify({"status": "success", "message": "Réponse enregistrée"})


if __name__ == '__main__':
    app.run(debug=True) 