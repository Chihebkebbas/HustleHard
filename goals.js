// Goals Data Management

let goals = [
    { id: 1, title: 'Lancer le MVP de Hustle Hard', q: 'Q1', deadline: '2026-03-31', completed: true, createdAt: '2026-01-05' },
    { id: 2, title: 'Atteindre 100 utilisateurs', q: 'Q1', deadline: '2026-03-15', completed: false, createdAt: '2026-01-10' },
    { id: 3, title: 'Recruter un dev Senior', q: 'Q2', deadline: '2026-05-01', completed: false, createdAt: '2026-04-01' },
    { id: 4, title: 'Lancer la campagne Marketing', q: 'Q2', deadline: '2026-06-01', completed: false, createdAt: '2026-04-15' },
    { id: 5, title: 'Series A Funding Round', q: 'Q3', deadline: '2026-09-30', completed: false, createdAt: '2026-07-01' },
    { id: 6, title: 'Expansion Internationale', q: 'Q4', deadline: '2026-12-31', completed: false, createdAt: '2026-10-01' }
];

document.addEventListener('DOMContentLoaded', () => {
    renderGoals();
    renderGantt();
    updateStats();
});

// --- View Logic ---
function switchView(viewName) {
    const cardsView = document.getElementById('cards-view');
    const ganttView = document.getElementById('gantt-view');
    const btns = document.querySelectorAll('.toggle-btn');

    if (viewName === 'cards') {
        cardsView.classList.remove('hidden');
        ganttView.classList.add('hidden');
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    } else {
        cardsView.classList.add('hidden');
        ganttView.classList.remove('hidden');
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
        renderGantt(); // Re-render to ensure sizes are correct
    }
}

// --- Cards View Render ---
function renderGoals() {
    // Clear lists
    ['Q1', 'Q2', 'Q3', 'Q4'].forEach(q => {
        document.getElementById(`list-${q.toLowerCase()}`).innerHTML = '';
    });

    goals.forEach(goal => {
        const container = document.getElementById(`list-${goal.q.toLowerCase()}`);
        if (container) {
            container.appendChild(createGoalElement(goal));
        }
    });
}

function createGoalElement(goal) {
    const div = document.createElement('div');
    div.className = 'goal-item';
    div.innerHTML = `
        <div class="goal-checkbox ${goal.completed ? 'checked' : ''}" onclick="toggleGoal(${goal.id})"></div>
        <div class="goal-content">
            <div class="goal-title">${goal.title}</div>
            <div class="goal-meta">
                <span>📅 Fin: ${formatDate(goal.deadline)}</span>
                <span>• Créé le ${formatDate(goal.createdAt)}</span>
            </div>
        </div>
        <div class="goal-actions">
            <button class="goal-btn-icon edit" title="Modifier" onclick="openEditGoalModal(${goal.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="goal-btn-icon delete" title="Supprimer" onclick="deleteGoal(${goal.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        </div>
    `;
    return div;
}

// --- Gantt Chart Render ---
function renderGantt() {
    const container = document.getElementById('gantt-lines');
    container.innerHTML = '';

    // Logic: Year is 2026 (Hardcoded for demo based on User context)
    const yearStart = new Date('2026-01-01').getTime();
    const yearEnd = new Date('2026-12-31').getTime();
    const totalDuration = yearEnd - yearStart;

    goals.forEach(goal => {
        const line = document.createElement('div');
        line.className = 'gantt-line';

        // Calculate Position
        const start = new Date(goal.createdAt).getTime();
        const end = new Date(goal.deadline).getTime();

        // Clamp start to year start just in case
        const safeStart = Math.max(start, yearStart);

        const leftPercent = ((safeStart - yearStart) / totalDuration) * 100;
        const widthPercent = ((end - safeStart) / totalDuration) * 100;

        const bar = document.createElement('div');
        bar.className = `gantt-bar ${goal.completed ? 'completed' : ''}`;
        bar.style.left = `${leftPercent}%`;
        bar.style.width = `${widthPercent}%`;
        bar.innerText = goal.title;
        bar.title = `${goal.title} (${formatDate(goal.createdAt)} - ${formatDate(goal.deadline)})`;

        // Click to toggle edit
        bar.onclick = () => openEditGoalModal(goal.id);

        line.appendChild(bar);
        container.appendChild(line);
    });
}

function toggleGoal(id) {
    const goal = goals.find(g => g.id === id);
    if (goal) {
        goal.completed = !goal.completed;
        renderGoals(); // Re-render to update UI and stats
        renderGantt();
        updateStats();
    }
}

function updateStats() {
    const total = goals.length;
    const completed = goals.filter(g => g.completed).length;
    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    animateValue('total-goals', parseInt(document.getElementById('total-goals').innerText), total, 500);
    animateValue('completed-goals', parseInt(document.getElementById('completed-goals').innerText), completed, 500);
    animateValue('pending-goals', parseInt(document.getElementById('pending-goals').innerText), pending, 500);
    animateValue('annual-progress', parseInt(document.getElementById('annual-progress').innerText), rate, 500, '%');

    // Update Quarter Progress Bars
    ['Q1', 'Q2', 'Q3', 'Q4'].forEach(q => {
        const qGoals = goals.filter(g => g.q === q);
        const qCompleted = qGoals.filter(g => g.completed).length;
        const qRate = qGoals.length > 0 ? Math.round((qCompleted / qGoals.length) * 100) : 0;

        const section = document.getElementById(`${q.toLowerCase()}-section`);
        const bar = section.querySelector('.q-progress-bar');
        if (bar) bar.style.width = `${qRate}%`;
    });
}

// --- Modal Logic ---
let isEditing = false;

function openAddGoalModal(preselectedQ = 'Q1') {
    isEditing = false;
    document.getElementById('modal-title').innerText = 'Nouvel Objectif';
    document.getElementById('goal-id').value = '';
    document.getElementById('goal-title').value = '';
    document.getElementById('goal-q').value = preselectedQ; // Use parameter
    document.getElementById('goal-deadline').value = '';

    document.getElementById('goal-modal').classList.remove('hidden');
}

function openEditGoalModal(id) {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    isEditing = true;
    document.getElementById('modal-title').innerText = 'Modifier Objectif';
    document.getElementById('goal-id').value = goal.id;
    document.getElementById('goal-title').value = goal.title;
    document.getElementById('goal-q').value = goal.q;
    document.getElementById('goal-deadline').value = goal.deadline;

    document.getElementById('goal-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('goal-modal').classList.add('hidden');
}

function saveGoal() {
    const title = document.getElementById('goal-title').value;
    const q = document.getElementById('goal-q').value;
    const deadline = document.getElementById('goal-deadline').value;

    if (!title || !deadline) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    if (isEditing) {
        const id = parseInt(document.getElementById('goal-id').value);
        const goalIndex = goals.findIndex(g => g.id === id);
        if (goalIndex > -1) {
            goals[goalIndex].title = title;
            goals[goalIndex].q = q;
            goals[goalIndex].deadline = deadline;
        }
    } else {
        const newGoal = {
            id: Date.now(),
            title: title,
            q: q,
            deadline: deadline,
            completed: false,
            createdAt: new Date().toISOString().split('T')[0]
        };
        goals.push(newGoal);
    }

    closeModal();
    renderGoals();
    renderGantt();
    updateStats();
}

function deleteGoal(id) {
    if (confirm('Supprimer cet objectif ?')) {
        goals = goals.filter(g => g.id !== id);
        renderGoals();
        renderGantt();
        updateStats();
    }
}

// Helpers
function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
}

function animateValue(id, start, end, duration, suffix = "") {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
