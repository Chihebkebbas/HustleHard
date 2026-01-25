document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Data
    const historyData = generateMockHistory();

    // 2. Initial Render
    renderHistory(historyData, 'all');
    calculateAndRenderStats(historyData);

    // 3. Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            // Filter
            const filterType = btn.getAttribute('data-filter');
            renderHistory(historyData, filterType);
        });
    });
});

function calculateAndRenderStats(data) {
    let totalTasks = 0;
    let completedTasks = 0;

    data.forEach(day => {
        totalTasks += day.totalCount;
        completedTasks += day.completedCount;
    });

    const globalRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Current Streak logic
    let currentStreak = 0;
    for (let i = 0; i < data.length; i++) {
        const rate = (data[i].completedCount / data[i].totalCount) * 100;
        if (rate >= 50) {
            currentStreak++;
        } else {
            break;
        }
    }

    // Best Streak logic
    let maxStreak = 0;
    let tempStreak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
        const rate = (data[i].completedCount / data[i].totalCount) * 100;
        if (rate >= 50) {
            tempStreak++;
        } else {
            if (tempStreak > maxStreak) maxStreak = tempStreak;
            tempStreak = 0;
        }
    }
    if (tempStreak > maxStreak) maxStreak = tempStreak;

    // Render with animation
    animateValue("stat-total-tasks", 0, totalTasks, 1000);
    animateValue("stat-global-rate", 0, globalRate, 1000, "%");
    animateValue("stat-current-streak", 0, currentStreak, 800);
    animateValue("stat-best-streak", 0, maxStreak, 1200);
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

function renderHistory(data, filter) {
    const container = document.getElementById('history-feed');
    container.innerHTML = ''; // Clear

    // Filter Logic
    const filteredData = data.filter(day => {
        const rate = Math.round((day.completedCount / day.totalCount) * 100);
        if (filter === 'all') return true;
        if (filter === 'high') return rate >= 80;
        if (filter === 'low') return rate < 50;
        return true;
    });

    if (filteredData.length === 0) {
        container.innerHTML = `<div style="padding:2rem; text-align:center; color:gray;">Aucun historique correspondant.</div>`;
        return;
    }

    // Render Rows
    container.innerHTML = filteredData.map(day => {
        const completionRate = Math.round((day.completedCount / day.totalCount) * 100);
        let rateClass = 'low';
        let barColor = '--accent-red';

        if (completionRate >= 80) { rateClass = 'high'; barColor = '--accent-green'; }
        else if (completionRate >= 50) { rateClass = 'medium'; barColor = '--accent-orange'; }

        return `
            <div class="history-day-row">
                <div class="day-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
                    <div class="day-info">
                        <span class="day-name">${day.dayName}</span>
                        <span class="day-date">${day.fullDate}</span>
                    </div>
                    
                    <div class="day-stats">
                        <div class="mini-progress">
                            <div class="mini-bar" style="width: ${completionRate}%; background-color: var(${barColor})"></div>
                        </div>
                        <div class="stat-badge ${rateClass}">${completionRate}%</div>
                    </div>
                </div>

                <div class="day-tasks-container">
                    ${day.tasks.map(task => `
                        <div class="mini-task ${task.completed ? 'completed' : 'missed'}">
                            <div class="dot-status ${task.completed ? 'completed' : 'pending'}"></div>
                            <span class="task-label" style="${task.completed ? 'text-decoration:line-through; color:var(--text-secondary)' : ''}">${task.title}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function generateMockHistory() {
    const data = [];
    const today = new Date();

    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

    // Generate 14 days of history for better scrolling/filtering demo
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const dayName = i === 0 ? "Aujourd'hui" : (i === 1 ? "Hier" : days[date.getDay()]);
        const fullDate = `${date.getDate()} ${months[date.getMonth()]}`;

        const tasks = getMockTasksForDay(i);
        const completedCount = tasks.filter(t => t.completed).length;

        data.push({
            dayName,
            fullDate,
            tasks,
            totalCount: tasks.length,
            completedCount
        });
    }
    return data;
}

function getMockTasksForDay(offset) {
    const baseTasks = [
        "Boire 2L d'eau",
        "Séance Sport",
        "Lecture (20p)",
        "Méditation",
        "Check emails",
        "Project Code",
        "Marche 10k",
        "Pas de sucre"
    ];

    const dayTasks = [];
    const count = 4 + Math.floor(Math.random() * 4); // 4 to 8 tasks

    for (let j = 0; j < count; j++) {
        // Simple random pick
        const title = baseTasks[Math.floor(Math.random() * baseTasks.length)];
        // Random boolean, weighted slightly to success for realism
        const completed = Math.random() > 0.3;
        dayTasks.push({ title, completed });
    }

    return dayTasks;
}
