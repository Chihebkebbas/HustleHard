import styles from './RoutineCard.module.css';

type RoutineCardProps = {
    title: string;
    icon?: string;
    titleColor: string;
    items: string[];
    completed: boolean;
    onToggle: () => void;
};

export default function RoutineCard({ title, icon, titleColor, items, completed, onToggle }: RoutineCardProps) {
    return (
        <div
            className={`${styles.routineBlock} ${completed ? styles.completed : ''}`}
            onClick={onToggle}
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
