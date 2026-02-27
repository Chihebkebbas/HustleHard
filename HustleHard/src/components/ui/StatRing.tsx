import styles from './StatRing.module.css'


type StatRingProps = {
    color?: 'orange' | 'bleu' | 'purple',
    score?: string | number,
    label?: string,
}

export default function StatRing(props: StatRingProps) {

    const score = props.score ? props.score : "220";

    const dashOffset = (220 - (220 * parseInt(score.toString())) / 100).toString();

    return (
        <div className={styles.statRingWrapper}>
            <svg>
                <circle className={styles.ringBg} cx="40" cy="40" r="36"></circle>
                <circle className={styles.ringProgress} cx="40" cy="40" r="36" style={{ stroke: props.color ? `var(--accent-${props.color})` : '#FF9500', strokeDashoffset: dashOffset }}></circle>
            </svg>
            <div className={styles.statContent}>
                <span>{score}%</span>
                {props.label && <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#86868B', marginTop: '2px' }}>{props.label}</span>}
            </div>
        </div>
    );
}