/* Programs Page Interaction Logic */

document.addEventListener('DOMContentLoaded', () => {
    // Existing setup if any
    setupModals();
    renderAIObjectives(); // Initial Render
});

// Program State Management
let currentProgram = {
    title: "Mon Programme",
    description: "Un programme complet pour maximiser la progression.",
    sessions: []
};

// Mock Backend Data for AI Objectives
let aiObjectives = [
    {
        id: 0,
        name: "Poids de corps",
        current: 75,
        target: 80,
        unit: "kg",
        icon: "⚖️",
        prediction: "Obj: Prise de masse"
    },
    {
        id: 1,
        name: "Incline Press",
        current: 80,
        target: 100,
        unit: "kg",
        icon: "🏋️",
        prediction: "4 semaines"
    },
    {
        id: 2,
        name: "Dips Lestés",
        current: 20,
        target: 40,
        unit: "kg",
        icon: "💪",
        prediction: "6 semaines"
    },
    {
        id: 3,
        name: "Pull Ups",
        current: 15,
        target: 30,
        unit: "kg",
        icon: "🧗",
        prediction: "5 semaines"
    },
    {
        id: 4,
        name: "Squat",
        current: 120,
        target: 140,
        unit: "kg",
        icon: "🦵",
        prediction: "8 semaines"
    }
];

// --- AI Objectives Rendering (View) ---
function renderAIObjectives() {
    const container = document.getElementById('ai-objectives-container');
    if (!container) return;

    container.innerHTML = aiObjectives.map(obj => {
        const percent = Math.min(100, Math.round((obj.current / obj.target) * 100));

        // Special Design for Bodyweight (ID 0) - Coherent Light Version
        if (obj.id === 0) {
            return `
            <div class="objective-card-special" onclick="openObjectiveModal(${obj.id})">
                <div class="special-icon-container">
                    <span class="special-icon-large">${obj.icon}</span>
                </div>
                <div class="special-content">
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                        <span class="special-label-light">Poids de corps</span>
                        <span class="special-current-small">${obj.current} ${obj.unit}</span>
                    </div>
                    <div class="special-target-row">
                        <span style="font-size:0.85rem; color:var(--text-secondary);">Objectif</span>
                        <span class="special-target-value">${obj.target} ${obj.unit}</span>
                    </div>
                </div>
            </div>
            `;
        }

        // Standard Design for Exercises
        return `
            <div class="objective-card" onclick="openObjectiveModal(${obj.id})">
                <div class="obj-icon-container">
                    <span class="obj-icon">${obj.icon}</span>
                </div>
                <div class="obj-details">
                    <div class="obj-header">
                        <span class="obj-name">${obj.name}</span>
                        <span class="obj-values">${obj.current}${obj.unit} <span style="color:var(--text-tertiary)">/ ${obj.target}${obj.unit}</span></span>
                    </div>
                    <div class="obj-progress-bg">
                        <div class="obj-progress-fill" style="width: ${percent}%;"></div>
                    </div>
                    <div class="obj-forecast">
                        Prédiction IA: Atteignable dans ${obj.prediction}
                    </div>
                </div>
                <div class="obj-action">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-tertiary)"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>
        `;
    }).join('');
}

// ... existing code ...

// --- AI Objective Modal Logic ---

function openObjectiveModal(id) {
    const obj = aiObjectives.find(o => o.id === id);
    if (!obj) return;

    const modal = document.getElementById('objective-modal');
    if (modal) {
        document.getElementById('modal-obj-title').textContent = obj.name;
        document.getElementById('modal-target-weight').value = obj.target;
        document.getElementById('modal-current-weight').value = obj.current;

        // Save ID to button for saving later (mock)
        const saveBtn = modal.querySelector('.btn-save-program');
        saveBtn.onclick = () => saveObjective(id);

        modal.classList.remove('hidden');
    }
}

function saveObjective(id) {
    const newVal = document.getElementById('modal-current-weight').value;
    const objIndex = aiObjectives.findIndex(o => o.id === id);
    if (objIndex > -1) {
        aiObjectives[objIndex].current = parseInt(newVal);
        renderAIObjectives(); // Re-render to show update
    }

    closeObjectiveModal();
    // alert('Objectif mis à jour ! 🚀');
    // alert('Objectif mis à jour ! 🚀');
}

function closeObjectiveModal() {
    const modal = document.getElementById('objective-modal');
    if (modal) modal.classList.add('hidden');
}

// --- Modals Logic ---

function setupModals() {
    // Determine which button opens the creator
    const createBtn = document.querySelector('.btn-primary[style*="var(--brand-color)"]');
    if (createBtn) {
        createBtn.onclick = openCreateProgramModal;
    }
}

function openCreateProgramModal() {
    const modal = document.getElementById('create-program-modal');
    if (modal) {
        modal.classList.remove('hidden');
        if (tempSessions.length === 0) addSession(); // Start with one if empty
        renderSessionInputs();
    }
}

function closeCreateProgramModal() {
    const modal = document.getElementById('create-program-modal');
    if (modal) modal.classList.add('hidden');
}

// --- Dynamic Session/Exercise Creation ---

let tempSessions = [];

function renderSessionInputs() {
    const container = document.getElementById('sessions-container');
    if (!container) return;

    container.innerHTML = '';

    tempSessions.forEach((session, index) => {
        const sessionEl = document.createElement('div');
        sessionEl.className = 'session-block';
        sessionEl.innerHTML = `
            <div class="session-header-input">
                <div class="session-number-badge">${index + 1}</div>
                <input type="text" class="session-name" value="${session.name}" placeholder="Nom (ex: Push A)" oninput="updateSessionName(${index}, this.value)">
                <button class="btn-icon-trash" onclick="removeSession(${index})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
            <div class="exercises-header-labels">
                <span style="flex:2">Exercice</span>
                <span style="flex:0.5; text-align:center">Séries</span>
                <span style="flex:0.5; text-align:center">Reps</span>
                <span style="width:24px"></span>
            </div>
            <div class="exercises-list" id="exercises-list-${index}">
                <!-- Exercises go here -->
            </div>
            <button class="btn-text-add" onclick="addExercise(${index})">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Ajouter Exercice
            </button>
        `;
        container.appendChild(sessionEl);

        renderExercises(index);
    });
}

function renderExercises(sessionIndex) {
    const list = document.getElementById(`exercises-list-${sessionIndex}`);
    if (!list) return;

    list.innerHTML = '';
    const exercises = tempSessions[sessionIndex].exercises;

    exercises.forEach((ex, exIndex) => {
        const row = document.createElement('div');
        row.className = 'exercise-row-input';
        row.innerHTML = `
            <input type="text" class="input-ghost ex-name" value="${ex.name}" placeholder="Nom de l'exercice" oninput="updateExercise(${sessionIndex}, ${exIndex}, 'name', this.value)">
            <input type="number" class="input-ghost ex-sets" value="${ex.sets}" placeholder="4" oninput="updateExercise(${sessionIndex}, ${exIndex}, 'sets', this.value)">
            <input type="text" class="input-ghost ex-reps" value="${ex.reps}" placeholder="8-12" oninput="updateExercise(${sessionIndex}, ${exIndex}, 'reps', this.value)">
            <button class="btn-icon-remove" onclick="removeExercise(${sessionIndex}, ${exIndex})">×</button>
        `;
        list.appendChild(row);
    });
}

// Data Manipulators
function addSession() {
    tempSessions.push({ id: Date.now(), name: "", exercises: [] });
    renderSessionInputs();
}

function removeSession(index) {
    tempSessions.splice(index, 1);
    renderSessionInputs();
}

function updateSessionName(index, value) {
    tempSessions[index].name = value;
}

function addExercise(sessionIndex) {
    tempSessions[sessionIndex].exercises.push({ name: "", sets: 3, reps: "10" });
    renderExercises(sessionIndex);
}

function removeExercise(sessionIndex, exIndex) {
    tempSessions[sessionIndex].exercises.splice(exIndex, 1);
    renderExercises(sessionIndex);
}

function updateExercise(sessionIndex, exIndex, field, value) {
    tempSessions[sessionIndex].exercises[exIndex][field] = value;
}

// --- Saving and Displaying ---

function saveProgram() {
    const titleInput = document.getElementById('program-title-input');
    const descInput = document.getElementById('program-description-input');

    const title = titleInput ? titleInput.value : "Nouveau Programme";
    const description = descInput ? descInput.value : "Aucune description";

    currentProgram = {
        title: title,
        description: description,
        sessions: JSON.parse(JSON.stringify(tempSessions))
    };

    // Update Active Program Hero
    document.querySelector('.hero-title').textContent = currentProgram.title;
    // Format description text with linebreak
    document.querySelector('.hero-description').innerHTML = `${currentProgram.sessions.length} Séances • Objectif: ${currentProgram.description}`;

    updateScheduleGrid();
    closeCreateProgramModal();
}

function updateScheduleGrid() {
    const container = document.getElementById('schedule-grid');
    if (!container) return;

    container.innerHTML = '';

    currentProgram.sessions.forEach((session, index) => {
        const card = document.createElement('div');
        card.className = 'day-card';
        card.onclick = () => openSessionDetails(session);

        // Generate description from exercises
        const desc = session.exercises.slice(0, 3).map(e => e.name).join(', ') || "Aucun exercice";

        card.innerHTML = `
            <div class="day-name">Séance ${index + 1}</div>
            <div class="workout-type">${session.name || 'Sans titre'}</div>
            <div class="muscle-groups">${desc}</div>
            <div class="status-badge">
                <div class="status-dot"></div>
            </div>
        `;

        container.appendChild(card);
    });
}

// --- Session Details & Weight Logging (The 'Execution' View) ---

function openSessionDetails(session) {
    // Generate the Execution HTML
    // We need to generate rows for EACH set of EACH exercise

    let exercisesHtml = '';

    session.exercises.forEach((ex, i) => {
        const numSets = parseInt(ex.sets) || 3;

        let setsRows = '';
        for (let s = 1; s <= numSets; s++) {
            setsRows += `
                <div class="set-row">
                    <div class="set-col-num">Série ${s}</div>
                    <div class="set-col-prev">-</div>
                    <div class="set-col-input">
                        <input type="number" class="log-input">
                    </div>
                    <div class="set-col-input">
                        <input type="number" class="log-input">
                    </div>
                </div>
            `;
        }

        exercisesHtml += `
            <div class="exercise-log-block">
                <div class="log-ex-header">
                    <h4>${ex.name}</h4>
                    <span class="log-target">${numSets} séries x ${ex.reps} reps</span>
                </div>
                <div class="log-table-header">
                    <div class="set-col-num">SÉRIE</div>
                    <div class="set-col-prev">PRÉCÉDENT</div>
                    <div class="set-col-input">POIDS</div>
                    <div class="set-col-input">REPS</div>
                </div>
                <div class="log-sets-container">
                    ${setsRows}
                </div>
            </div>
        `;
    });

    const detailsHtml = `
        <div class="workout-logger-view">
            ${exercisesHtml}
        </div>
    `;

    // Create Modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay logger-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-card logger-card">
            <div class="modal-header">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:1px; font-weight:600;">Workout Log</span>
                    <h3 style="margin:0; font-size:1.4rem;">${session.name}</h3>
                </div>
                <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body logger-body">
                ${detailsHtml}
            </div>
            <div class="modal-footer" style="display:flex; justify-content:flex-end; margin-top:1rem; padding-top:1rem; border-top:1px solid #E5E5EA;">
                <button class="btn-save-program" style="width:auto; padding:12px 28px;" onclick="this.closest('.modal-overlay').remove(); alert('Séance terminée ! Bravo !')">Terminer la séance</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
