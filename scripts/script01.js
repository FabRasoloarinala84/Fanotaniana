document.addEventListener('DOMContentLoaded', () => {
    const formBuilder = document.getElementById('form-builder');
    const addFieldButton = document.getElementById('add-field');
    const saveFormButton = document.getElementById('save-form');

    addFieldButton.addEventListener('click', () => {
        const field = document.createElement('div');
        field.className = 'form-group mt-2';
        field.innerHTML = `
            <input type="text" class="form-control mb-1" placeholder="Nom du champ">
            <select class="form-select">
                <option value="text">Texte</option>
                <option value="number">Numérique</option>
                <option value="email">Email</option>
            </select>
        `;
        formBuilder.appendChild(field);
    });

    saveFormButton.addEventListener('click', () => {
        const fields = [...formBuilder.querySelectorAll('.form-group')].map(group => ({
            label: group.querySelector('input').value,
            type: group.querySelector('select').value

        }));
        // Envoyer au back-end
        fetch('controllers/saveForm.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields })
        }).then(response => response.json())
            .then(data => {
                alert(data.message);
                loadForms(); // Recharge la liste des formulaires 
            })
            .catch(error => console.error('Erreur:', error));
    });
});

// fonction pour récupérer et afficher les formulaires
function loadForms() {
    const formsContainer = document.getElementById('forms-container');

    // Vérifiez si le conteneur existe avant de manipuler son contenu
    if (!formsContainer) {
        console.error("L'élément avec l'ID 'forms-container' n'a pas été trouvé.");
        return;
    }

    fetch('controllers/getForms.php')
        .then(response => response.json())
        .then(data => {
            const formsList = document.getElementById('forms-list');
            formsList.innerHTML = ''; // Réinitialise la liste

            data.forms.forEach(form => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    Formulaire #${form.id} - Créé le ${new Date(form.created_at).toLocaleString()}
                    <button class="btn btn-primary btn-sm" onclick="viewForm(${form.id})">Voir</button>
                `;
                formsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des formulaires:', error));
}

function viewForm(id) {
    alert(`Affichage du formulaire ID: ${id} (logique à développer)`);
}

// Charger les formulaires existants lors du chargement de la page
document.addEventListener('DOMContentLoaded', loadForms);

// Cette fonction sera appelée lors de la soumission du formulaire.
function submitForm(formData) {
    fetch('controllers/saveForm.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Formulaire enregistré:', data);
            // Après avoir sauvegardé le formulaire, on peut récupérer et afficher les formulaires
            loadForms(); // Chargement des formulaires après l'enregistrement
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement du formulaire:', error);
        });
}



