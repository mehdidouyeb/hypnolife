document.addEventListener('DOMContentLoaded', () => {
    // Animation des éléments avec la classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.classList.add('visible');
    });

    // Sélection des catégories dans la page de diagnostic
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            // Vérifier si les infos personnelles ont été enregistrées
            const savedInfo = localStorage.getItem('personalInfo');
            if (!savedInfo) {
                alert('Veuillez d\'abord enregistrer vos informations personnelles avant de choisir une catégorie.');
                window.location.href = '/personal-info';
                return;
            }

            // Redirection vers la page du questionnaire correspondant
            const category = this.getAttribute('data-category');
            if (category) {
                window.location.href = `/questionnaire/${category}`;
            }
        });
    });

    // Gestion du formulaire d'informations personnelles
    const saveInfoButton = document.getElementById('save-info-button');
    if (saveInfoButton) {
        saveInfoButton.addEventListener('click', function () {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const age = document.getElementById('age').value;
            const height = document.getElementById('height').value;
            const weight = document.getElementById('weight').value;

            // Vérifier que tous les champs sont remplis
            if (!firstName || !lastName || !email || !age || !height || !weight) {
                alert('Veuillez remplir tous les champs avant de continuer.');
                return;
            }

            // Sauvegarder les informations personnelles dans localStorage
            const personalInfo = { firstName, lastName, email, age, height, weight };
            localStorage.setItem('personalInfo', JSON.stringify(personalInfo));

            // Rediriger vers la page de diagnostic
            window.location.href = '/diagnostic';
        });
    }

    // Pré-remplir le formulaire avec les données localStorage si elles existent
    const personalInfoForm = document.getElementById('personal-info-form');
    if (personalInfoForm) {
        const savedInfo = localStorage.getItem('personalInfo');
        if (savedInfo) {
            const personalInfo = JSON.parse(savedInfo);

            document.getElementById('firstName').value = personalInfo.firstName || '';
            document.getElementById('lastName').value = personalInfo.lastName || '';
            document.getElementById('email').value = personalInfo.email || '';
            document.getElementById('age').value = personalInfo.age || '';
            document.getElementById('height').value = personalInfo.height || '';
            document.getElementById('weight').value = personalInfo.weight || '';
        }
    }
});

// Simple animation for elements with fade-in class
function animateElements() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    if (fadeInElements.length > 0) {
        fadeInElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, 100 * index);
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 