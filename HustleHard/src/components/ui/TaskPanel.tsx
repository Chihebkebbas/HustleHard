import { useState, type KeyboardEvent } from 'react';
import styles from './TaskPanel.module.css';
import { useTasks } from '../../context/TasksContext';

export default function TaskPanel() {
    const [activeTab, setActiveTab] = useState<'today' | 'tomorrow'>('today');
    const { tasksToday, tasksTomorrow, addTask, toggleTask, deleteTask } = useTasks();
    const [inputValue, setInputValue] = useState('');

    const currentTasks = activeTab === 'today' ? tasksToday : tasksTomorrow;
    const isToday = activeTab === 'today';

    const handleQuickAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            addTask(inputValue.trim(), isToday);
            setInputValue('');
        }
    };

    return (
        <section className={styles.tasksPanel}>
            <div className={styles.panelHeader}>
                <h3>Mes Tâches</h3>
                <div className={styles.segmentedControl}>
                    <div
                        className={`${styles.segmentedOption} ${activeTab === 'today' ? styles.active : ''}`}
                        onClick={() => setActiveTab('today')}
                    >
                        Aujourd'hui
                    </div>
                    <div
                        className={`${styles.segmentedOption} ${activeTab === 'tomorrow' ? styles.active : ''}`}
                        onClick={() => setActiveTab('tomorrow')}
                    >
                        Demain
                    </div>
                </div>
            </div>

            <div className={styles.tasksView}>
                {currentTasks.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                            {activeTab === 'today' ? "Rien à faire aujourd'hui !" : "Planifiez votre journée de demain."}
                        </p>
                    </div>
                ) : (
                    currentTasks.map(task => (
                        <div key={task.id} className={styles.taskRow}>
                            <div className={styles.taskLeft}>
                                <input
                                    type="checkbox"
                                    className={styles.appleCheckbox}
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id, isToday)}
                                />
                                <span className={styles.taskText}>{task.text}</span>
                            </div>
                            <button className={styles.taskDeleteBtn} onClick={() => deleteTask(task.id, isToday)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className={styles.quickAddRow} onClick={() => document.getElementById('quick-input')?.focus()}>
                <span className={styles.plusIcon}>+</span>
                <input
                    id="quick-input"
                    type="text"
                    className={styles.quickInput}
                    placeholder="Ajouter une tâche..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleQuickAdd}
                />
            </div>
        </section>
    );
}
