import styles from './ScoreCircle.module.css';

interface ScoreCircleProps {
    score: number;
    className?: string; // allow adding .main or custom classes
}

export default function ScoreCircle({ score, className = '' }: ScoreCircleProps) {
    let colorClass = '';
    if (score >= 90) colorClass = styles.excellent;
    else if (score >= 70) colorClass = styles.good;
    else colorClass = styles.medium;

    return (
        <div className={`${styles.scoreCircle} ${colorClass} ${className}`}>
            {score}
        </div>
    );
}
