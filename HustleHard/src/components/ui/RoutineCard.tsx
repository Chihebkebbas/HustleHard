import { useState } from 'react';
import styles from './RoutineCard.module.css';

type RoutineCardProps = {
    title: string;
    icon?: string; // e.g. "☀️"
    titleColor: string;
    items: string[];
};

export default function RoutineCard({ title, icon, titleColor, items }: RoutineCardProps) {
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <div
            className={`${styles.routineBlock} ${isCompleted ? styles.completed : ''}`}
            onClick={() => setIsCompleted(!isCompleted)}
        >
            <div className={styles.routineHeader}>
                <h3 style={{ color: titleColor }}>
                    {icon && <span>{icon}</span>} {title}
                </h3>
                <div className={styles.checkBadge}>✓</div>
            </div>
            <ul className={styles.routineItems}>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
