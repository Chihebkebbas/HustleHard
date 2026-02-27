import { useState } from 'react';
import styles from './HistoryItem.module.css';

interface TaskRecord {
    id: string;
    label: string;
    completed: boolean;
}

interface HistoryItemProps {
    dayName: string;
    date: string;
    progressPercent: number;
    tasks: TaskRecord[];
    isExpandedInitially?: boolean;
}

export default function HistoryItem({
    dayName,
    date,
    progressPercent,
    tasks,
    isExpandedInitially = false
}: HistoryItemProps) {
    const [isExpanded, setIsExpanded] = useState(isExpandedInitially);

    let progressColor = '#34C759'; // green style
    let badgeClass = styles.high;

    if (progressPercent < 50) {
        progressColor = '#FF3B30'; // red
        badgeClass = styles.low;
    } else if (progressPercent < 80) {
        progressColor = '#FF9F0A'; // orange
        badgeClass = styles.medium;
    }

    return (
        <div className={styles.historyDayRow}>
            <div className={styles.dayHeader} onClick={() => setIsExpanded(!isExpanded)}>
                <div className={styles.dayInfo}>
                    <span className={styles.dayName}>{dayName}</span>
                    <span className={styles.dayDate}>{date}</span>
                </div>
                <div className={styles.dayStats}>
                    <div className={styles.miniProgress}>
                        <div className={styles.miniBar} style={{ width: `${progressPercent}%`, background: progressColor }}></div>
                    </div>
                    <div className={`${styles.statBadge} ${badgeClass}`}>{progressPercent}%</div>
                </div>
            </div>

            {isExpanded && (
                <div className={styles.dayTasksContainer}>
                    {tasks.map(task => (
                        <div key={task.id} className={`${styles.miniTask} ${task.completed ? styles.completed : ''}`}>
                            <div className={`${styles.dotStatus} ${task.completed ? styles.completed : ''}`}></div>
                            <span className={styles.taskLabel}>{task.label}</span>
                        </div>
                    ))}
                    {tasks.length === 0 && (
                        <div style={{ color: '#8E8E93', fontSize: '0.9rem', fontStyle: 'italic', padding: '0.5rem 1rem' }}>
                            Aucune tâche engristrée
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
