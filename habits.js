// Habits Data Management

// Mock Data
let habits = [
    { id: 1, name: 'Méditation', icon: '🧘', freq: 7, streak: 12, history: [true, true, true, true, false, true, true], completedToday: true },
    { id: 2, name: 'Lecture', icon: '📖', freq: 7, streak: 5, history: [false, true, true, true, true, true, false], completedToday: false },
    { id: 3, name: 'Sport', icon: '🏋️', freq: 5, streak: 24, history: [true, true, true, false, true, true, true], completedToday: true },
    { id: 4, name: 'Boire de l\'eau', icon: '💧', freq: 7, streak: 0, history: [false, false, true, false, false, false, false], completedToday: false }
];

document.addEventListener('DOMContentLoaded', () => {
    renderHabits();
});

function renderHabits() {
    const listBody = document.getElementById('habits-list-body');
    listBody.innerHTML = '';

    habits.forEach(habit => {
        listBody.appendChild(createHabitRow(habit));
    });
}

function createHabitRow(habit) {
    const div = document.createElement('div');
    div.className = 'habit-row';

    // Simple label construction
    const freq = habit.freq || 7;
    const label = `${freq}j / 7`;

    // History Dots HTML
    const historyDots = habit.history.map((status, index) =>
        // Logic can be expanded to show 'missed' only if it was expected that day, keeping simple for demo
        `<div class="history-dot ${status ? 'done' : ''}" title="${status ? 'Completed' : 'Pending'}"></div>`
    ).join('');

    div.innerHTML = `
        <div class="cell-name">
            <div class="habit-icon-sq">${habit.icon}</div>
            <span>${habit.name}</span>
        </div>
        <div class="cell-freq">
            <span class="freq-badge">${label}</span>
        </div>
        <div class="cell-streak">
            <span class="streak-fire">🔥</span> ${habit.streak}
        </div>
        <div class="cell-history">
            ${historyDots}
            <div class="today-toggle ${habit.completedToday ? 'completed' : ''}" onclick="toggleToday(${habit.id})"></div>
        </div>
        <div class="cell-actions">
           <button class="action-icon-btn" onclick="openEditHabitModal(${habit.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
           </button>
           <button class="action-icon-btn delete" onclick="deleteHabit(${habit.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
           </button>
        </div>
    `;
    return div;
}

function toggleToday(id) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.completedToday = !habit.completedToday;
        // Mock logic: Update streak immediately for visual feedback
        if (habit.completedToday) {
            habit.streak++;
            // In real app, push to history
        } else {
            habit.streak--;
        }
        renderHabits();
    }
}

// --- Modal Logic ---
let isEditing = false;

function openAddHabitModal() {
    isEditing = false;
    document.getElementById('modal-title').innerText = 'Nouvelle Habitude';
    document.getElementById('habit-id').value = '';
    document.getElementById('habit-name').value = '';
    document.getElementById('habit-icon').value = '';
    document.getElementById('habit-freq').value = '7'; // Default 7
    document.getElementById('habit-modal').classList.remove('hidden');
}

function openEditHabitModal(id) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    isEditing = true;
    document.getElementById('modal-title').innerText = 'Modifier Habitude';
    document.getElementById('habit-id').value = habit.id;
    document.getElementById('habit-name').value = habit.name;
    document.getElementById('habit-icon').value = habit.icon;
    document.getElementById('habit-freq').value = habit.freq;
    document.getElementById('habit-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('habit-modal').classList.add('hidden');
}

function saveHabit() {
    const name = document.getElementById('habit-name').value;
    const icon = document.getElementById('habit-icon').value || '✨';
    const freq = document.getElementById('habit-freq').value;

    if (!name) { alert("Nom requis!"); return; }

    if (isEditing) {
        const id = parseInt(document.getElementById('habit-id').value);
        const idx = habits.findIndex(h => h.id === id);
        if (idx !== -1) {
            habits[idx].name = name;
            habits[idx].icon = icon;
            habits[idx].freq = freq;
        }
    } else {
        const newHabit = {
            id: Date.now(),
            name,
            icon,
            freq,
            streak: 0,
            history: [false, false, false, false, false, false, false],
            completedToday: false
        };
        habits.push(newHabit);
    }
    closeModal();
    renderHabits();
}

function deleteHabit(id) {
    if (confirm("Supprimer cette habitude ?")) {
        habits = habits.filter(h => h.id !== id);
        renderHabits();
    }
}
