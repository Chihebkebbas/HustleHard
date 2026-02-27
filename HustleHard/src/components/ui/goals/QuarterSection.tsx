import styles from './QuarterSection.module.css';
import GoalCard, { type Goal } from './GoalCard';

interface QuarterSectionProps {
    title: string;
    badge: string;
    progress: number;
    goals: Goal[];
    onToggleGoal: (id: string) => void;
    onDeleteGoal: (id: string) => void;
    onEditGoal: (goal: Goal) => void;
    onAddGoal: (quarter: "Q1" | "Q2" | "Q3" | "Q4") => void;
}

export default function QuarterSection({
    title,
    badge,
    progress,
    goals,
    onToggleGoal,
    onDeleteGoal,
    onEditGoal,
    onAddGoal
}: QuarterSectionProps) {
    return (
        <section className={styles.quarterSection}>
            <div className={styles.quarterHeader}>
                <h2 className={styles.qTitle}>
                    <span className={styles.qBadge}>{badge}</span> {title}
                </h2>
                <div className={styles.qProgressWrapper}>
                    <div className={styles.qProgressBar} style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className={styles.goalsList}>
                {goals.map(goal => (
                    <GoalCard
                        key={goal.id}
                        goal={goal}
                        onToggle={onToggleGoal}
                        onDelete={onDeleteGoal}
                        onEdit={onEditGoal}
                    />
                ))}
            </div>

            <button className={styles.quickAddBtn} onClick={() => onAddGoal(badge as "Q1" | "Q2" | "Q3" | "Q4")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg> Ajouter
            </button>
        </section>
    );
}
