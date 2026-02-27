import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import QuarterSection from '../components/ui/goals/QuarterSection';
import GanttChart from '../components/ui/goals/GanttChart';
import type { Goal } from '../components/ui/goals/GoalCard';
import styles from './Goals.module.css';

const INITIAL_GOALS: Goal[] = [
    { id: '1', title: 'Atteindre 85kg de PDC sec', quarter: 'Q1', deadline: '2025-03-31', completed: true },
    { id: '2', title: 'Développer l\'app', quarter: 'Q1', completed: false },
    { id: '3', title: 'Lancer le MVP', quarter: 'Q2', deadline: '2025-06-30', completed: false },
    { id: '4', title: 'Atteindre 100 utilisateurs actifs', quarter: 'Q3', completed: false },
    { id: '5', title: 'Générer 1000€ MRR', quarter: 'Q4', completed: false }
];

export default function Goals() {
    const [view] = useState<'quarters' | 'gantt'>('quarters');
    const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

    // Add Goal Modal State logic would go here

    const toggleGoal = (id: string) => {
        setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    const deleteGoal = (id: string) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const editGoal = (goal: Goal) => {
        console.log("Edit goal", goal);
    };

    const addGoal = (quarter: string) => {
        console.log("Add goal for quarter", quarter);
    };

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <TopBar
                    title="Mes Objectifs 2025"
                    subTitle="Vision annuelle et trimestrielle"
                    isNotif={true}
                    notificationIcon={true}
                    headerButton={true}
                    buttonText="Nouvel Objectif"
                    buttonClassName="buttonBrand"
                    goalsViewToggle={true}
                // Since TopBar doesn't accept children and handles the toggle natively,
                // we would need to lift state up or pass a callback to TopBar.
                // For now, to match TopBar's current API, we just enable the toggle flag.
                // To make the toggle functional, we'll need to update TopBar to accept `view` and `onViewChange` later if needed,
                // or keep the static structure for the design conversion phase.
                />

                <div className={styles.goalsStatsGrid}>
                    <div className={styles.gStatCard}>
                        <div className={`${styles.gIconBox} ${styles.purple}`}>🎯</div>
                        <div className={styles.gStatInfo}>
                            <span className={styles.gLabel}>Total Fixés</span>
                            <span className={styles.gValue}>{goals.length}</span>
                        </div>
                    </div>
                    <div className={styles.gStatCard}>
                        <div className={`${styles.gIconBox} ${styles.green}`}>✅</div>
                        <div className={styles.gStatInfo}>
                            <span className={styles.gLabel}>Atteints</span>
                            <span className={styles.gValue}>{goals.filter(g => g.completed).length}</span>
                        </div>
                    </div>
                    <div className={styles.gStatCard}>
                        <div className={`${styles.gIconBox} ${styles.blue}`}>⏳</div>
                        <div className={styles.gStatInfo}>
                            <span className={styles.gLabel}>En Cours</span>
                            <span className={styles.gValue}>{goals.filter(g => !g.completed && g.quarter === 'Q1').length}</span>
                        </div>
                    </div>
                    <div className={styles.gStatCard}>
                        <div className={`${styles.gIconBox} ${styles.orange}`}>⚡️</div>
                        <div className={styles.gStatInfo}>
                            <span className={styles.gLabel}>Taux de Succès</span>
                            <span className={styles.gValue}>{Math.round((goals.filter(g => g.completed).length / goals.length) * 100 || 0)}%</span>
                        </div>
                    </div>
                </div>

                {view === 'quarters' ? (
                    <div className={styles.quartersContainer}>
                        <QuarterSection
                            title="Fondations"
                            badge="Q1"
                            progress={30}
                            goals={goals.filter(g => g.quarter === 'Q1')}
                            onToggleGoal={toggleGoal}
                            onDeleteGoal={deleteGoal}
                            onEditGoal={editGoal}
                            onAddGoal={addGoal}
                        />
                        <QuarterSection
                            title="Accélération"
                            badge="Q2"
                            progress={0}
                            goals={goals.filter(g => g.quarter === 'Q2')}
                            onToggleGoal={toggleGoal}
                            onDeleteGoal={deleteGoal}
                            onEditGoal={editGoal}
                            onAddGoal={addGoal}
                        />
                        <QuarterSection
                            title="Expansion"
                            badge="Q3"
                            progress={0}
                            goals={goals.filter(g => g.quarter === 'Q3')}
                            onToggleGoal={toggleGoal}
                            onDeleteGoal={deleteGoal}
                            onEditGoal={editGoal}
                            onAddGoal={addGoal}
                        />
                        <QuarterSection
                            title="Finalisation"
                            badge="Q4"
                            progress={0}
                            goals={goals.filter(g => g.quarter === 'Q4')}
                            onToggleGoal={toggleGoal}
                            onDeleteGoal={deleteGoal}
                            onEditGoal={editGoal}
                            onAddGoal={addGoal}
                        />
                    </div>
                ) : (
                    <div style={{ padding: '0 0 3rem' }}>
                        <GanttChart goals={goals} onGoalClick={editGoal} />
                    </div>
                )}
            </main>
        </>
    );
}
