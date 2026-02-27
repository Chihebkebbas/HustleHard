import styles from './GoalCard.module.css';

export interface Goal {
    id: string;
    title: string;
    quarter: "Q1" | "Q2" | "Q3" | "Q4";
    deadline?: string;
    completed: boolean;
}

interface GoalCardProps {
    goal: Goal;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (goal: Goal) => void;
}

export default function GoalCard({ goal, onToggle, onDelete, onEdit }: GoalCardProps) {

    // Formatting deadline to be readable (e.g. 15 Mars)
    const formattedDate = goal.deadline ? new Date(goal.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '';

    return (
        <div className={styles.goalItem}>
            <div
                className={`${styles.goalCheckbox} ${goal.completed ? styles.checked : ''}`}
                onClick={() => onToggle(goal.id)}
            ></div>
            <div className={styles.goalContent}>
                <span className={styles.goalTitle} style={{ textDecoration: goal.completed ? 'line-through' : 'none' }}>
                    {goal.title}
                </span>
                {goal.deadline && (
                    <div className={styles.goalMeta}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {formattedDate}
                    </div>
                )}
            </div>

            <div className={styles.goalActions}>
                <button className={`${styles.goalBtnIcon} ${styles.edit}`} onClick={() => onEdit(goal)} title="Modifier">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button className={`${styles.goalBtnIcon} ${styles.delete}`} onClick={() => onDelete(goal.id)} title="Supprimer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
