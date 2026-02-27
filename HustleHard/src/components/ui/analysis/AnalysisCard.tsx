import styles from './AnalysisCard.module.css';
import ScoreCircle from './ScoreCircle';

interface AnalysisCardProps {
    date: string;
    score: number;
    title: string;
    summary: string;
    onClick?: () => void;
}

export default function AnalysisCard({ date, score, title, summary, onClick }: AnalysisCardProps) {
    return (
        <div className={styles.analysisCard} onClick={onClick}>
            <div className={styles.cardHeader}>
                <span className={styles.analysisDate}>{date}</span>
                <ScoreCircle score={score} />
            </div>
            <h4>{title}</h4>
            <div className={styles.summary}>{summary}</div>
            <div className={styles.cardFooterLink}>Voir le rapport</div>
        </div>
    );
}
