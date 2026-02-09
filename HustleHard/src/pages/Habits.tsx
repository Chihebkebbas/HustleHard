import { useState } from 'react';
import Sidebar from "../components/layout/Sidebar.tsx";
import TopBar from "../components/layout/TopBar.tsx";
import styles from './Habits.module.css';
import { useHabits, type Habit } from '../context/HabitsContext.tsx';
import AddButton from '../components/ui/AddButton.tsx';

export default function Habits() {
    const { habits, addHabit, updateHabit, deleteHabit: contextDeleteHabit, toggleToday } = useHabits();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [habitId, setHabitId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [freq, setFreq] = useState(7);

    // --- Actions ---

    const handleDeleteHabit = (id: number) => {
        if (confirm("Supprimer cette habitude ?")) {
            contextDeleteHabit(id);
        }
    };

    const openAddModal = () => {
        setIsEditing(false);
        setHabitId(null);
        setName('');
        setIcon('');
        setFreq(7);
        setIsModalOpen(true);
    };

    const openEditModal = (habit: Habit) => {
        setIsEditing(true);
        setHabitId(habit.id);
        setName(habit.name);
        setIcon(habit.icon);
        setFreq(habit.freq);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveHabit = () => {
        if (!name) {
            alert("Nom requis!");
            return;
        }

        const iconValue = icon || '✨';

        if (isEditing && habitId) {
            updateHabit(habitId, { name, icon: iconValue, freq });
        } else {
            addHabit({
                name,
                icon: iconValue,
                freq,
            });
        }
        closeModal();
    };


    return (
        <>
            <Sidebar />
            <main className="main-content">
                <TopBar
                    isNotif={true}
                    notificationIcon={true}
                    title="Mes Habitudes"
                    subTitle="Construisez votre discipline quotidienne"
                    buttonClassName="buttonDefault"
                    buttonText="+ Nouvelle Habitude"
                    headerButton={true}
                    onButtonClick={openAddModal}
                />

                {/* Habits Overview & AI Insight */}
                <section className={styles.habitsStatsGrid}>
                    <div className={styles.hStatCard}>
                        <div className={`${styles.hStatIcon} ${styles.green}`}>🔥</div>
                        <div className={styles.hStatContent}>
                            <div className={styles.hStatValue}>12</div>
                            <div className={styles.hStatLabel}>Best Streak</div>
                        </div>
                    </div>
                    <div className={styles.hStatCard}>
                        <div className={`${styles.hStatIcon} ${styles.blue}`}>✅</div>
                        <div className={styles.hStatContent}>
                            <div className={styles.hStatValue}>85%</div>
                            <div className={styles.hStatLabel}>Complétion</div>
                        </div>
                    </div>

                    {/* AI Suggestion Card */}
                    <div className={`${styles.hStatCard} ${styles.aiSuggestion}`}>
                        <div className={`${styles.hStatIcon} ${styles.purple}`}>💡</div>
                        <div className={styles.hStatContent}>
                            <div className={styles.hStatLabel} style={{ color: 'var(--accent-indigo)', marginBottom: '4px' }}>Suggestion IA</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3 }}>
                                "Essaie 5min de respiration ce soir."
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Habits List */}
                <section className={styles.habitsContainer}>
                    <div className={styles.habitsHeaderRow}>
                        <div className={styles.colName}>Habitude</div>
                        <div className={styles.colFreq}>Fréquence</div>
                        <div className={styles.colStreak}>Streak</div>
                        <div className={styles.colHistory}>Derniers 7 Jours</div>
                        <div className={styles.colActions}></div>
                    </div>

                    <div className={styles.habitsListBody}>
                        {habits.map(habit => (
                            <div key={habit.id} className={styles.habitRow}>
                                <div className={styles.cellName}>
                                    <div className={styles.habitIconSq}>{habit.icon}</div>
                                    <span>{habit.name}</span>
                                </div>
                                <div className={styles.cellFreq}>
                                    <span className={styles.freqBadge}>{habit.freq}j / 7</span>
                                </div>
                                <div className={styles.cellStreak}>
                                    <span className={styles.streakFire}>🔥</span> {habit.streak}
                                </div>
                                <div className={styles.cellHistory}>
                                    {habit.history.map((status, idx) => (
                                        <div
                                            key={idx}
                                            className={`${styles.historyDot} ${status ? styles.done : ''}`}
                                            title={status ? 'Completed' : 'Pending'}
                                        />
                                    ))}
                                    <div
                                        className={`${styles.todayToggle} ${habit.completedToday ? styles.completed : ''}`}
                                        onClick={() => toggleToday(habit.id)}
                                    />
                                </div>
                                <div className={styles.cellActions}>
                                    <button className={styles.actionIconBtn} onClick={() => openEditModal(habit)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className={`${styles.actionIconBtn} ${styles.delete}`}
                                        onClick={() => handleDeleteHabit(habit.id)}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Add Button (Bottom of Card) */}
                    <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem' }}>
                        <AddButton onClick={openAddModal}>Ajouter une habitude</AddButton>
                    </div>
                </section>
            </main>

            {/* Add Habit Modal */}
            <div className={`${styles.modalOverlay} ${!isModalOpen ? styles.hidden : ''}`}>
                <div className={styles.modalCard}>
                    <div className={styles.modalHeader}>
                        <h3>{isEditing ? 'Modifier Habitude' : 'Nouvelle Habitude'}</h3>
                        <button className={styles.closeModal} onClick={closeModal}>×</button>
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.formGroup}>
                            <label>Titre de l'habitude</label>
                            <input
                                type="text"
                                placeholder="Ex: Lire 10 pages..."
                                className={styles.inputField}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup} style={{ flex: '0 0 80px' }}>
                                <label>Icone</label>
                                <input
                                    type="text"
                                    placeholder="📚"
                                    className={styles.inputField}
                                    style={{ textAlign: 'center' }}
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup} style={{ flex: 1 }}>
                                <label>Fréquence (Jours/Semaine)</label>
                                <div>
                                    <input
                                        type="number"
                                        className={styles.inputField}
                                        placeholder="7"
                                        min={1}
                                        max={7}
                                        value={freq}
                                        onChange={(e) => setFreq(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button className={styles.btnCancel} onClick={closeModal}>Annuler</button>
                        <button className={styles.btnSave} onClick={saveHabit}>Enregistrer</button>
                    </div>
                </div>
            </div>
        </>
    );
}