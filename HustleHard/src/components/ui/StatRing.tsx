import styles from './StatRing.module.css'


type StatRingProps = {
    color: 'orange' | 'bleu' | 'purple',
    title: string,
}

export default function StatRing({color, title}: StatRingProps) {

    let score:number = 90;

    const colors = {
        orange: '#FF9500',
        bleu: '#007AFF',
        purple: '#5856D6',
    }

    let dashOffset:number = 45;

    return (
        <div className={styles.statRingWrapper}>
            <svg>
                <circle className={styles.ringBg} cx="40" cy="40" r="36"></circle>
                <circle className={styles.ringProgress} cx="40" cy="40" r="36"
                        style={{stroke: color, strokeDashoffset: dashOffset}}></circle>
            </svg>
            <div className={styles.statContent}><span>{score}%</span><span
                style={{fontSize: '0.6rem', textTransform: 'uppercase', color: '#86868B', marginTop: '2px'}}>{title}</span>
            </div>
        </div>
    )
}