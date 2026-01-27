// JS pour le Dashboard "Hustle Hard"
const API_URL = 'http://localhost:8080/api/tasks';

// 1. Initialisation
document.addEventListener('DOMContentLoaded', () => {
    checkBackendConnection();
});

// 2. Logic Toggle Exercises (Sport)
window.toggleExercises = function () {
    const list = document.getElementById('workout-list'); // Changed ID matches new HTML
    if (list) {
        list.classList.toggle('open'); // Changed class matches CSS
    }
    // Update button text (Optional, if we want to change arrow direction, etc.)
};

// 3. Add New Habit Row Function
// 3. Add New Habit Row Function
window.addNewHabitRow = function () {
    const tbody = document.getElementById('habit-body');
    const newRow = document.createElement('tr');

    // Check color randomizer or default (blue/brand)
    const rowContent = `
        <td>
            <div class="habit-name-flex">
                <div class="habit-icon-sq" style="color:#007AFF">✨</div>
                <span contenteditable="true" style="outline:none; width:100%;">Nouvelle Habitude</span>
            </div>
        </td>
        <td>
           <div class="freq-badge">
               <input type="text" class="freq-input" value="1"> / sem
           </div>
        </td>
        <td><div class="check-row">${generateCircles(7)}</div></td>
        <td><div class="check-row">${generateCircles(7)}</div></td>
        <td><div class="check-row">${generateCircles(7)}</div></td>
        <td><div class="check-row">${generateCircles(7)}</div></td>
        <td>
            <div class="habit-actions">
                <button class="action-btn" title="Modifier" onclick="toggleEditHabit(this)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                <button class="action-btn delete" title="Supprimer" onclick="deleteHabitRow(this)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
            </div>
        </td>
    `;

    newRow.innerHTML = rowContent;
    tbody.appendChild(newRow);
};

// 4. Delete Habit Row
window.deleteHabitRow = function (btn) {
    if (confirm('Voulez-vous vraiment supprimer cette habitude ?')) {
        const row = btn.closest('tr');
        row.remove();
    }
};

// 5. Toggle Edit (Optional Focus)
window.toggleEditHabit = function (btn) {
    const row = btn.closest('tr');
    const nameSpan = row.querySelector('.habit-name-flex span') || row.querySelector('.habit-name-flex');

    // Normalize logic for pre-existing static rows vs new dynamic rows
    if (nameSpan) {
        // If contentEditable is not set, set it temporarily
        if (!nameSpan.isContentEditable) {
            nameSpan.setAttribute('contenteditable', 'true');
        }
        nameSpan.focus();
    }
};

// 6. Delete Task Row
window.deleteTask = function (btn) {
    const row = btn.closest('.task-row');
    row.style.opacity = '0';
    row.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        row.remove();
    }, 200); // Wait for transition
};

// Helper to generate circles for new rows
function generateCircles(count) {
    let html = '';
    for (let i = 0; i < count; i++) { // Using 4 circles per week to match layout or 7? Layout has 4 usually but let's see HTML
        // HTML has 4 divs usually (sometimes 3). Let's stick to 4 for visual consistency with existing rows.
        if (i < 4) {
            html += `<div class="day-circle" onclick="this.classList.toggle('filled-blue')"></div>`;
        }
    }
    return html;
}

// 2. Interaction Toggle pour les Cercles d'Habitudes et Tâches
// Note: Le HTML utilise déjà onclick="this.classList.toggle('checked')" pour la simplicité
// Ici on pourrait ajouter la logique pour sauvegarder en base de données.

// 3. Backend Fetch avec Fallback
function checkBackendConnection() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("API inaccessible");
            return response.json();
        })
        .then(data => {
            console.log("Données récupérées:", data);
            // Si backend connecté, on pourrait remplir la liste des tâches dynamiquement ici
        })
        .catch(err => {
            console.log("Mode Demo (Backend Off):", err);
        });
}

// 7. Tasks View Switcher (Today / Tomorrow)
let currentTaskView = 'today';

window.switchTaskView = function (view) {
    currentTaskView = view;

    // Toggle active tab style
    document.querySelectorAll('.segmented-option').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${view}`).classList.add('active');

    // Toggle container visibility
    document.getElementById('tasks-today').style.display = view === 'today' ? 'block' : 'none';
    document.getElementById('tasks-tomorrow').style.display = view === 'tomorrow' ? 'block' : 'none';
};

// 8. Handle Quick Add Task
window.handleQuickAdd = function (input) {
    if (input.value.trim() === '') return;

    const containerId = currentTaskView === 'today' ? 'tasks-today' : 'tasks-tomorrow';
    const container = document.getElementById(containerId);

    // Remove empty state if present
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }

    const div = document.createElement('div');
    div.className = 'task-row';
    // Animation for new task
    div.style.transition = 'all 0.3s ease';
    div.style.opacity = '0';
    div.style.transform = 'translateY(10px)';

    div.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="apple-checkbox">
            <span class="task-text">${input.value}</span>
        </div>
        <button class="task-delete-btn" onclick="deleteTask(this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
        </button>
    `;

    container.appendChild(div);

    // Trigger animation
    requestAnimationFrame(() => {
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
    });

    input.value = '';
};

// 9. Update AI Score Card Design based on Value
window.updateAIScoreDesign = function () {
    const card = document.getElementById('yesterday-score-card');
    const valueEl = document.getElementById('ai-score-value');

    if (!card || !valueEl) return;

    // Parse integer from string (e.g. "88%" -> 88)
    const scoreText = valueEl.innerText.replace(/\D/g, ''); // Extract digits
    const score = parseInt(scoreText, 10);

    // Remove all specific classes first
    card.classList.remove('score-low', 'score-med', 'score-high', 'score-elite');

    if (isNaN(score)) return;

    // Apply logic:
    // Red: < 60
    // Yellow: 60 - 110
    // Green: 110 - 160
    // Black: > 160

    if (score < 60) {
        card.classList.add('score-low');
    } else if (score < 110) {
        card.classList.add('score-med');
    } else if (score < 160) {
        card.classList.add('score-high');
    } else {
        card.classList.add('score-elite');
    }
};

// Profile Edit Modal Logic
function openProfileEditModal() {
    const modal = document.getElementById('edit-profile-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeProfileEditModal() {
    const modal = document.getElementById('edit-profile-modal');
    if (modal) modal.classList.add('hidden');
}

// Sidebar Profile Interaction
document.addEventListener('DOMContentLoaded', () => {
    // 1. Check AI Score
    updateAIScoreDesign();

    // 2. Sidebar Profile Link Handler
    const sidebarProfileLink = document.querySelector('.sidebar-profile');
    if (sidebarProfileLink && window.location.pathname.includes('profile.html')) {
        sidebarProfileLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent page reload
            openProfileEditModal();
        });
    }
});
