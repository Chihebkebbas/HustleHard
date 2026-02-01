import { useState } from 'react';
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
};

export default function WorkoutCard({ title, duration, type, exercises }: WorkoutCardProps) {
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <div
            className={`${styles.workoutCard} ${isCompleted ? styles.completed : ''}`}
            onClick={() => setIsCompleted(!isCompleted)}
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
