import styles from './GanttChart.module.css';
import type { Goal } from './GoalCard';

interface GanttChartProps {
    goals: Goal[];
    onGoalClick?: (goal: Goal) => void;
}

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

export default function GanttChart({ goals, onGoalClick }: GanttChartProps) {

    // Quick helper to map quarters to start/end months (0-indexed)
    const quarterMap = {
        'Q1': { start: 0, end: 3 }, // Jan-Mar (ends before April)
        'Q2': { start: 3, end: 6 }, // Apr-Jun
        'Q3': { start: 6, end: 9 }, // Jul-Sep
        'Q4': { start: 9, end: 12 } // Oct-Dec
    };

    return (
        <div className={styles.ganttContainer}>
            <div className={styles.ganttHeader}>
                <div className={styles.ganttMonths}>
                    {MONTHS.map((month, idx) => (
                        <div key={idx}>{month}</div>
                    ))}
                </div>
            </div>
            <div className={styles.ganttBody}>
                {goals.map(goal => {
                    const q = quarterMap[goal.quarter];
                    // 12 months = 100%. Each month is 100/12 %.
                    const left = (q.start / 12) * 100;
                    const width = ((q.end - q.start) / 12) * 100;

                    return (
                        <div key={goal.id} className={styles.ganttLine}>
                            <div
                                className={`${styles.ganttBar} ${goal.completed ? styles.completed : ''}`}
                                style={{ left: `${left}%`, width: `${width}%` }}
                                onClick={() => onGoalClick?.(goal)}
                            >
                                {goal.title}
                            </div>
                        </div>
                    );
                })}
                {goals.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '1rem', color: '#8E8E93', fontSize: '0.9rem' }}>
                        Aucun objectif défini
                    </div>
                )}
            </div>
        </div>
    );
}
