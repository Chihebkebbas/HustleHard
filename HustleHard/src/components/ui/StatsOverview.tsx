import styles from './StatsOverview.module.css'
import StatRing from "./StatRing.tsx";
import { useHabits } from '../../context/HabitsContext.tsx';
import { useTasks } from '../../context/TasksContext.tsx';
import { usePrograms } from '../../context/ProgramsContext.tsx';

export default function StatsOverview() {
    const { habits } = useHabits();
    const { tasksToday } = useTasks();
    const { routines } = usePrograms();

    // Calculate max streak
    const streak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;

    // Calculate Routine completion
    const completedRoutines = routines.filter(r => r.completed).length;
    const routinePercent = routines.length === 0 ? 0 : Math.round((completedRoutines / routines.length) * 100);

    // Calculate Tasks completion
    const completedTasks = tasksToday.filter(t => t.completed).length;
    const taskPercent = tasksToday.length === 0 ? 0 : Math.round((completedTasks / tasksToday.length) * 100);

    // Calculate Habits completion
    const completedHabits = habits.filter(h => h.completedToday).length;
    const habitPercent = habits.length === 0 ? 0 : Math.round((completedHabits / habits.length) * 100);

    return (
        <section className={styles.statsOverviewCard}>
            <div className={styles.streakContainer}>
                <div className={styles.streakIconBox}>🔥</div>
                <div className={styles.streakInfo}>
                    <div className={styles.count}>{streak}</div>
                    <div className={styles.label}>Jours Streak</div>
                </div>
            </div>
            <div className={styles.progressGroup}>
                <StatRing color={"orange"} label={"Routine"} score={routinePercent} />
                <StatRing color={"bleu"} label={"Tâches"} score={taskPercent} />
                <StatRing color={"purple"} label={"Habit."} score={habitPercent} />
            </div>

            <div className={styles.quoteContainer}>
                <div className={styles.quoteText}>"La discipline est le pont entre les objectifs et l'accomplissement."</div>
                <div className={styles.quoteAuthor}>
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #30CFD0, #330867)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 800,
                        }}
                    >
                        IA Insight
                    </span>
                    <span>• Jim Rohn</span>
                </div>
            </div>
        </section>
    )
}