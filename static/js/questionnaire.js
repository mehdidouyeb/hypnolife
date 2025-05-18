document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('questionnaire-form');
    if (!form) return;

    const questionContainers = document.querySelectorAll('.question-container');
    const resultContainer = document.querySelector('.result-container');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const progressBar = document.getElementById('progress-bar');
    const avatarText = document.getElementById('avatar-text');
    const avatarMessage = document.querySelector('.avatar-message');

    let currentQuestion = 1; // Commencer directement à la question 1
    const totalQuestions = questionContainers.length;

    // Récupérer les informations personnelles du localStorage
    const userResponses = {
        personalInfo: JSON.parse(localStorage.getItem('personalInfo')) || {},
        questions: {}
    };

    // Afficher la première question
    questionContainers[0].style.display = 'block';

    // Initialiser la barre de progression
    updateProgressBar();

    // Commentaires de l'avatar pour chaque question
    const avatarComments = {
        1: "Cette image jaillie du subconscient est déjà la clé de ta transformation durable ; laisse-la t'orienter avec vers ton poids idéal santé avec le soutien du Dr Ghizleine grâce au programme métamorphose et au Cercle Privé Mincir Durablement !",
        2: "Reconnaître la sagesse intime de ton corps ancre la confiance nécessaire pour entrer dans le Programme Métamorphose, où l'hypnose ravive ce dialogue intérieur et fonctionnement de ton inconscient.",
        3: "L'émotion initiale sert d'interrupteur à l'inconscient ; le cercle Privé est votre allié pour mincir durablement avec la synergie d'une communauté qui travaille sur le même objectif et vous accompagner dans vos objectifs Santé et Bien Ëtre",
        4: "Nommer la petite voix critique, puis la transformer, fait partie des rituels de notre communauté : Cercle Privé Gestion du Poids, où chaque séance d'hypnose raffine ton langage intérieur grâce à notre suivi au quotidien.",
        5: "Ces grignotages automatiques révèlent un vieux circuit neuronal du aux émotions non libérés et des schémas anciens ; au fil des sessions du programme métamorphose, nous le transformons vers des gestes apaisés et nourrissants.",
        6: "Identifier ce lien soulage déjà votre subconscient ; au sein du Cercle Privé du programme Métamorphose, l'hypnose le reconfigure en une relation apaisée, durable et libre de toute contrainte.",
        7: "Identifier ces bénéfices cachés ouvre la voie à leur substitution avec notre suivi pointu, étape clé du programme métamorphose qui aligne tes gains réels alignés avec ton objectif minceur et ton poids idéal santé au niveau inconscient. Pour un résultat durable et agréable, rejoindre les membres de la communauté privé de la Gestion du poids vous permet d'adopter des rituels à long terme",
        8: "Mettre en lumière cette image-objectif invite déjà votre subconscient à l'action ; dans le Cercle Privé du programme Métamorphose, chaque membre est mobilisé par sa propre image, un dynamisme accentué par le suivi du Dr Idrissi. Les sessions d'hypnose nourrissent l'amour de soi et la confiance en soi ; l'Amour de soi ne serait que renouvelé et priorisé.",
        9: "Avoir le poids idéal Minceur vous apporte une amélioration nette de votre santé et une légèreté au quotidien ; dans le Cercle Privé du programme Métamorphose, l'hypnose les dénoue pas à pas, vous offrant un quotidien plus fluide et confortable.",
        10: "Ces signaux sont le langage intime de votre corps ; le programme Métamorphose accompagné dans le Cercle Privé, avec des sessions et des exercices pointus vous réaccordent cette communication pour alléger la silhouette, renforcer la vitalité et prolonger durablement votre santé.",
        11: "Le laps de temps écoulé éclaire la solidité des automatismes inconscients ; au sein du Cercle Privé du programme Métamorphose – Gestion saine du poids, l'hypnose dénoue ces habitudes durablement, évitant le cycle « yoyo » et installant un équilibre pérenne.",
        12: "Cette évaluation révèle l'ouverture de votre inconscient à la transformation ; une note élevée signale que vous êtes prêt·e à intégrer pleinement la PROGRAMME Métamorphose Gestion du Poids et le Cercle Privé sous l'expertise du Dr Ghizleine et à mobiliser vos ressources profondes pour un changement durable.",
        13: "Reprogrammer la boucle « stress →grignotage » fait partie de la gestion des émotions au sein du Programme Métamorphose Gestion des émotions, où nos sessions installent une réponse plus douce et durable.",
        14: "Cette réaction mesure la force des codes sociaux ancrés dans l'inconscient ; l'hypnose les reprogramme pour que votre objectif minceur reste prioritaire, en mobilisant l'intelligence naturelle du corps, sans frustration. Car le corps est intelligent, il s'adapte grâce aux codes et techniques communiqués lors de votre programme métamorphose.",
        15: "Ce dialogue silencieux avec votre reflet révèle un programme inconscient profondément ancré. L'hypnose permet de transformer ce jugement en une parole intérieure encourageante. Car la manière dont vous vous voyez influence puissamment votre engagement et vos résultats. Le programme de transformation inclut ce travail de renforcement, accompagné par un cercle de soutien bienveillant.",
        // Commentaires pour le test de cortisol
        16: "Votre réveil est un moment clé qui reflète l'équilibre de votre cortisol. Un réveil tendu ou très fatigué signale souvent un cortisol déséquilibré. L'hypnose peut aider à reprogrammer ce cycle hormonal naturel pour retrouver des matins plus sereins.",
        17: "Les fluctuations d'énergie révèlent comment votre corps gère inconsciemment son cortisol. L'hypnose aide à équilibrer naturellement cette courbe hormonale, sans dépendance aux stimulants comme la caféine ou le sucre.",
        18: "Votre réponse au stress immédiat est programmée dans votre inconscient depuis longtemps. Grâce à l'hypnose, nous pouvons installer une nouvelle réponse plus adaptative et moins préjudiciable pour votre équilibre physique et émotionnel.",
        19: "La qualité de votre sommeil est étroitement liée à votre régulation du cortisol. L'hypnose offre des outils puissants pour rétablir un sommeil réparateur en harmonisant vos rythmes hormonaux naturels.",
        20: "Les tensions corporelles à la fin de la journée sont des messages de votre inconscient sur la façon dont vous gérez le stress quotidien. En transe hypnotique, ces tensions peuvent se relâcher, ouvrant la voie à une reprogrammation durable de votre réponse au stress.",
        "result": "Vos réponses ont révélé les patterns inconscients qui façonnent à la fois votre relation au poids et votre gestion du stress. Le programme Métamorphose et le Cercle Privé vous offrent un chemin privilégié pour reprogrammer ces schémas profonds, équilibrer votre cortisol et installer de nouvelles associations qui soutiennent naturellement votre équilibre. Contactez le Dr Ghizleine pour commencer votre transformation."
    };

    // Icônes de l'avatar pour chaque question
    const avatarIcons = {
        1: "fa-brain",
        2: "fa-heartbeat",
        3: "fa-leaf",
        4: "fa-comment",
        5: "fa-hand-paper",
        6: "fa-apple-alt",
        7: "fa-shield-alt",
        8: "fa-star",
        9: "fa-calendar-day",
        10: "fa-lungs",
        11: "fa-hourglass-half",
        12: "fa-door-open",
        13: "fa-bolt",
        14: "fa-users",
        15: "fa-mirror",
        // Icônes pour le test de cortisol
        16: "fa-sun",
        17: "fa-chart-line",
        18: "fa-exclamation-circle",
        19: "fa-moon",
        20: "fa-balance-scale",
        "result": "fa-infinity"
    };

    // Afficher le commentaire initial
    updateAvatar(1);

    // Fonction pour gérer la navigation entre les questions
    nextButton.addEventListener('click', () => {
        // Vérifier si une option est sélectionnée pour la question actuelle
        const currentOptions = document.querySelectorAll(`input[name="q${currentQuestion}"]`);
        let optionSelected = false;

        currentOptions.forEach(option => {
            if (option.checked) {
                optionSelected = true;
                // Sauvegarder la réponse
                userResponses.questions[currentQuestion] = option.value;
                saveAnswer(currentQuestion, option.value);
            }
        });

        if (!optionSelected) {
            alert('Veuillez sélectionner une réponse avant de continuer.');
            return;
        }

        // Si nous sommes à la dernière question, afficher les résultats
        if (currentQuestion === totalQuestions) {
            questionContainers.forEach(container => container.style.display = 'none');
            resultContainer.style.display = 'block';
            nextButton.style.display = 'none';
            prevButton.style.display = 'none';
            progressBar.style.width = '100%';
            updateAvatar("result");

            // Générer le rapport
            generateReport(userResponses);

            return;
        }

        // Passer à la question suivante
        questionContainers[currentQuestion - 1].style.display = 'none';
        currentQuestion++;
        questionContainers[currentQuestion - 1].style.display = 'block';

        // Mettre à jour l'avatar
        updateAvatar(currentQuestion);

        // Mettre à jour les boutons et la barre de progression
        if (currentQuestion > 1) {
            prevButton.style.display = 'inline-block';
        }

        if (currentQuestion === totalQuestions) {
            nextButton.textContent = 'Voir les résultats';
        }

        updateProgressBar();
    });

    // Gérer le bouton précédent
    prevButton.addEventListener('click', () => {
        currentQuestion--;

        questionContainers[currentQuestion].style.display = 'none';
        questionContainers[currentQuestion - 1].style.display = 'block';

        // Mettre à jour l'avatar
        updateAvatar(currentQuestion);

        if (currentQuestion === 1) {
            prevButton.style.display = 'none';
        }

        nextButton.textContent = 'Suivant';

        updateProgressBar();
    });

    // Mettre à jour la barre de progression
    function updateProgressBar() {
        const progress = ((currentQuestion - 1) / (totalQuestions - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Mettre à jour l'avatar (commentaire uniquement, pas d'icône) avec animation
    function updateAvatar(questionId) {
        avatarMessage.classList.add('changing');

        setTimeout(() => {
            // Mettre à jour le texte
            avatarText.textContent = avatarComments[questionId];
            avatarMessage.classList.remove('changing');
        }, 300);
    }

    // Simuler la sauvegarde des réponses (dans une application réelle, envoyer au serveur)
    function saveAnswer(questionId, answer) {
        console.log(`Question ${questionId}: ${answer}`);

        // Envoyer les données au serveur
        fetch('/save_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: form.dataset.category,
                questionId: questionId,
                answer: answer
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Réponse enregistrée:', data);
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }

    // Générer le rapport basé sur les réponses de l'utilisateur
    function generateReport(userResponses) {
        // Remplir les informations personnelles
        document.getElementById('client-firstname').textContent = userResponses.personalInfo.firstName;
        document.getElementById('client-lastname').textContent = userResponses.personalInfo.lastName;

        // Calculer l'IMC
        const height = userResponses.personalInfo.height / 100; // Convertir cm en m
        const weight = parseFloat(userResponses.personalInfo.weight);
        const imc = weight / (height * height);
        document.getElementById('imc-value').textContent = imc.toFixed(1);

        // Calculer l'âge métabolique (approximation simple)
        const realAge = parseInt(userResponses.personalInfo.age);
        let ageMetabolic = realAge;

        if (imc > 25) {
            // Ajouter des années pour le surpoids
            ageMetabolic += Math.round((imc - 25) * 1.5);
        } else if (imc < 18.5) {
            // Ajouter des années pour la maigreur
            ageMetabolic += Math.round((18.5 - imc) * 1.2);
        }

        document.getElementById('age-metabolic-value').textContent = ageMetabolic;

        // Calculer le taux d'engagement (basé sur la question 12 - disponibilité intérieure)
        let engagement = 25; // Valeur par défaut
        if (userResponses.questions[12]) {
            const engagementMap = {
                'niveau1': 25,
                'niveau2': 50,
                'niveau3': 75,
                'niveau4': 100
            };
            engagement = engagementMap[userResponses.questions[12]];
        }
        document.getElementById('engagement-value').textContent = engagement;

        // Calculer le taux de motivation intérieure (moyenne de plusieurs réponses)
        const motivationScores = {
            // Question 2 - Le corps "sait" comment atteindre ce poids
            2: {
                'fortement': 100,
                'moyennement': 75,
                'faiblement': 50,
                'pastout': 25
            },
            // Question 3 - Émotion face au changement d'alimentation
            3: {
                'enthousiasme': 100,
                'crainte': 50,
                'devoir': 75,
                'colere': 25
            },
            // Question 8 - Espoir pour le poids d'équilibre
            8: {
                'confiance': 100,
                'silhouette': 75,
                'aisance': 90,
                'sante': 85,
                'evenement': 70,
                'qualite': 80
            }
        };

        let motivationSum = 0;
        let motivationCount = 0;

        for (const questionId in motivationScores) {
            if (userResponses.questions[questionId] && motivationScores[questionId][userResponses.questions[questionId]]) {
                motivationSum += motivationScores[questionId][userResponses.questions[questionId]];
                motivationCount++;
            }
        }

        const motivationScore = motivationCount > 0 ? Math.round(motivationSum / motivationCount) : 70;
        document.getElementById('motivation-value').textContent = motivationScore;

        // Calculer le score global Métamorphose (combinaison pondérée)
        // 40% IMC, 30% motivation, 30% engagement
        const imcNormalized = imc > 30 ? 50 : imc < 18.5 ? 60 : 100 - Math.abs(imc - 22) * 5;
        const scoreGlobal = Math.round(0.4 * imcNormalized + 0.3 * motivationScore + 0.3 * engagement);
        document.getElementById('score-global-value').textContent = scoreGlobal;

        // Calculer le score d'équilibre du cortisol (basé sur les questions 16-20)
        const cortisolScores = {
            // Question 16 - État au réveil
            16: {
                'calme': 100,
                'tension': 40,
                'fatigue': 20
            },
            // Question 17 - Énergie en fin de matinée
            17: {
                'stable': 100,
                'irritabilite': 50,
                'effondrement': 20
            },
            // Question 18 - Réaction au stress
            18: {
                'recul': 100,
                'agacement': 50,
                'submerge': 20
            },
            // Question 19 - Qualité du sommeil
            19: {
                'paisible': 100,
                'ruminations': 50,
                'reveils': 30
            },
            // Question 20 - État en fin de journée
            20: {
                'detendus': 100,
                'raideur': 50,
                'epuisement': 20
            }
        };

        let cortisolSum = 0;
        let cortisolCount = 0;

        for (const questionId in cortisolScores) {
            if (userResponses.questions[questionId] && cortisolScores[questionId][userResponses.questions[questionId]]) {
                cortisolSum += cortisolScores[questionId][userResponses.questions[questionId]];
                cortisolCount++;
            }
        }

        const cortisolScore = cortisolCount > 0 ? Math.round(cortisolSum / cortisolCount) : 60;
        document.getElementById('cortisol-value').textContent = cortisolScore;

        // Générer la courbe de cortisol
        createCortisolChart(userResponses);
    }

    // Fonction pour créer la courbe de cortisol
    function createCortisolChart(userResponses) {
        const ctx = document.getElementById('cortisolChart').getContext('2d');

        // Heures de la journée
        const hours = ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'];

        // Valeurs idéales du cortisol pour une journée
        const idealCortisol = [18, 25, 20, 15, 12, 10, 8, 5, 2];

        // Récupérer les informations du cortisol à partir des réponses
        const morningState = userResponses.questions[16] || 'calme';
        const middayState = userResponses.questions[17] || 'stable';
        const stressResponse = userResponses.questions[18] || 'recul';
        const sleepQuality = userResponses.questions[19] || 'paisible';
        const eveningState = userResponses.questions[20] || 'detendus';

        // Calculer la courbe estimée du cortisol du client
        let userCortisol = [...idealCortisol]; // Commencer avec la courbe idéale

        // Moduler la courbe en fonction des réponses

        // État au réveil
        if (morningState === 'tension') {
            userCortisol[0] = 24; // Cortisol élevé au réveil
            userCortisol[1] = 30; // Pic plus élevé
        } else if (morningState === 'fatigue') {
            userCortisol[0] = 10; // Cortisol bas au réveil
            userCortisol[1] = 18; // Pic plus bas
        }

        // Énergie en fin de matinée
        if (middayState === 'irritabilite') {
            userCortisol[2] = 25; // Maintien d'un niveau élevé
            userCortisol[3] = 20; // Descente plus lente
        } else if (middayState === 'effondrement') {
            userCortisol[2] = 12; // Chute rapide
            userCortisol[3] = 8; // Niveau très bas en début d'après-midi
        }

        // Réaction au stress
        if (stressResponse === 'agacement') {
            userCortisol[4] = 18; // Pic de stress en après-midi
            userCortisol[5] = 16; // Maintien élevé
        } else if (stressResponse === 'submerge') {
            userCortisol[4] = 22; // Pic de stress très élevé
            userCortisol[5] = 18; // Descente lente
        }

        // État en fin de journée
        if (eveningState === 'raideur') {
            userCortisol[6] = 12; // Niveau encore élevé en soirée
            userCortisol[7] = 9; // Descente lente
        } else if (eveningState === 'epuisement') {
            userCortisol[6] = 5; // Niveau très bas (épuisement)
            userCortisol[7] = 3; // Reste bas
        }

        // Qualité du sommeil (impact sur la fin de journée)
        if (sleepQuality === 'ruminations') {
            userCortisol[7] = 10; // Remontée en soirée
            userCortisol[8] = 7; // Niveau élevé avant coucher
        } else if (sleepQuality === 'reveils') {
            userCortisol[8] = 6; // Niveau élevé au coucher
        }

        // Créer le graphique
        const cortisolChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: hours,
                datasets: [
                    {
                        label: 'Courbe idéale',
                        data: idealCortisol,
                        borderColor: 'rgba(90, 75, 209, 0.7)',
                        backgroundColor: 'rgba(90, 75, 209, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Votre courbe estimée',
                        data: userCortisol,
                        borderColor: 'rgba(201, 75, 192, 0.7)',
                        backgroundColor: 'rgba(201, 75, 192, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterBody: function (context) {
                                const insights = [
                                    'Au réveil, votre cortisol devrait être élevé pour vous donner l\'énergie nécessaire pour démarrer la journée.',
                                    'Le pic de cortisol matinal vous aide à vous sentir alerte et concentré(e).',
                                    'En fin de matinée, le cortisol commence naturellement à diminuer.',
                                    'À midi, votre cortisol devrait se stabiliser à un niveau intermédiaire.',
                                    'En début d\'après-midi, le cortisol continue sa baisse progressive.',
                                    'Un léger pic peut survenir en milieu d\'après-midi pour maintenir votre concentration.',
                                    'En fin de journée, le cortisol devrait diminuer pour préparer votre corps au repos.',
                                    'En soirée, le cortisol doit être bas pour permettre à la mélatonine d\'agir.',
                                    'Avant le coucher, un cortisol très bas est essentiel pour un sommeil de qualité.'
                                ];

                                // Afficher l'insight correspondant à l'heure survolée
                                document.getElementById('cortisol-insight').textContent = insights[context[0].dataIndex];

                                return null;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Niveau de cortisol'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }
}); 