import styles from './DayCard.module.css';

export interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

export interface Session {
    name: string;
    workoutType: string;
    muscleGroups: string;
    completed: boolean;
    exercises: Exercise[];
}

interface DayCardProps {
    session: Session;
    onClick?: (session: Session) => void;
}

export default function DayCard({ session, onClick }: DayCardProps) {
    return (
        <div className={styles.dayCard} onClick={() => onClick?.(session)}>
            <div className={styles.dayName}>{session.name}</div>
            <div className={styles.workoutType}>{session.workoutType}</div>
            <div className={styles.muscleGroups}>{session.muscleGroups}</div>
            <div className={styles.statusBadge}>
                <div className={`${styles.statusDot} ${session.completed ? styles.done : ''}`}>
                    {session.completed && '✓'}
                </div>
            </div>
        </div>
    );
}
