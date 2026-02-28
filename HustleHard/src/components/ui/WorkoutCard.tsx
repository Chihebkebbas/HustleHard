import styles from './WorkoutCard.module.css';

type Exercise = {
    name: string;
    setsRep: string;
};

type WorkoutCardProps = {
    title: string;
    duration: string;
    type: string;
    exercises: Exercise[];
    completed: boolean;
    onToggle: () => void;
};

export default function WorkoutCard({ title, duration, type, exercises, completed, onToggle }: WorkoutCardProps) {
    return (
        <div
            className={`${styles.workoutCard} ${completed ? styles.completed : ''}`}
            onClick={onToggle}
        >
            <div className={styles.workoutHeader}>
                <div>
                    <span className={styles.workoutTitleLabel}>Séance du Jour</span>
                    <h2>{title}</h2>
                    <div className={styles.workoutMeta}>{duration} • {type}</div>
                </div>
                <div className={styles.workoutCheck}>✓</div>
            </div>

            <div className={styles.exercisesPane}>
                {exercises.map((ex, index) => (
                    <div key={index} className={styles.exRow}>
                        <span>{ex.name}</span>
                        <span>{ex.setsRep}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
