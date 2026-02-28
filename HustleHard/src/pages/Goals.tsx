import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import QuarterSection from '../components/ui/goals/QuarterSection';
import GanttChart from '../components/ui/goals/GanttChart';
import { useGoals, type Goal } from '../context/GoalsContext';
import styles from './Goals.module.css';

export default function Goals() {
    const [view] = useState<'quarters' | 'gantt'>('quarters');
    const { goals, toggleGoal, deleteGoal, addGoal: addGoalContext } = useGoals();

    // Add Goal Modal State logic would go here

    const editGoal = (goal: Goal) => {
        console.log("Edit goal", goal);
    };

    const addGoal = (quarter: string) => {
        addGoalContext({
            title: "Nouvel Objectif",
            quarter: quarter as "Q1" | "Q2" | "Q3" | "Q4",
            completed: false
        });
    };

    const getProgress = (quarter: string) => {
        const qGoals = goals.filter(g => g.quarter === quarter);
        if (qGoals.length === 0) return 0;
        const completed = qGoals.filter(g => g.completed).length;
        return Math.round((completed / qGoals.length) * 100);
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
                            <span className={styles.gValue}>{Math.round((goals.filter(g => g.completed).length / (goals.length || 1)) * 100)}%</span>
                        </div>
                    </div>
                </div>

                {view === 'quarters' ? (
                    <div className={styles.quartersContainer}>
                        <QuarterSection
                            title="Fondations"
                            badge="Q1"
                            progress={getProgress('Q1')}
                            goals={goals.filter(g => g.quarter === 'Q1')}
                            onToggleGoal={toggleGoal}
                            onDeleteGoal={deleteGoal}
                            onEditGoal={editGoal}
                            onAddGoal={addGoal}
                        />
                        <QuarterSection
                            title="Accélération"
                            badge="Q2"
                            progress={getProgress('Q2')}
                            goals={goals.filter(g => g.quarter === 'Q2')}
                            onToggleGoal={toggleGoal}
                            onDeleteGoal={deleteGoal}
                            onEditGoal={editGoal}
                            onAddGoal={addGoal}
                        />
                        <QuarterSection
                            title="Expansion"
                            badge="Q3"
                            progress={getProgress('Q3')}
                            goals={goals.filter(g => g.quarter === 'Q3')}
                            onToggleGoal={toggleGoal}
                            onDeleteGoal={deleteGoal}
                            onEditGoal={editGoal}
                            onAddGoal={addGoal}
                        />
                        <QuarterSection
                            title="Finalisation"
                            badge="Q4"
                            progress={getProgress('Q4')}
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
