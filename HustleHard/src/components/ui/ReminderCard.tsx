import styles from './ReminderCard.module.css'

type ReminderCardProps = {
    title: string,
    icon: string,
    value: string,
    color: string,
    score?: boolean
}

export default function ReminderCard({ title, icon, value, color, score = false }: ReminderCardProps) {

    const colors = {
        blue: '#E1F5FE',
        purple: '#F3E5F5',
        green: '#E8F5E9',
        yellow: '#FFF3E0'
    }

    const scoreColors = {
        red: '#FFEBEE',
        yellow: '#FFF3E0',
        green: '#E8F5E9',
        black: '#ECEFF1',
    }

    const scoreTextColors = {
        red: '#C62828',
        yellow: '#EF6C00',
        green: '#2E7D32',
        black: '#263238',
    }

    if (score) {
        const scoreValue = parseInt(value, 10);

        if (!Number.isNaN(scoreValue)) {
            if (scoreValue < 69) {
                color = 'red'
            } else if (scoreValue < 110) {
                color = 'yellow'
            } else if (scoreValue < 160) {
                color = 'green'
            } else {
                color = 'black'
            }
        }
    }

    return (

        <div className={styles.reminderCard}>
            <div className={styles.widgetIcon} style={{
                background: score
                    ? scoreColors[color as keyof typeof scoreColors] || '#FFFFFF'
                    : colors[color as keyof typeof colors] || '#FFFFFF'
            }}>{icon}</div>
            <div className={styles.reminderInfo}>
                <h4>{title}</h4>
                <div className={styles.value} style={score ? { color: scoreTextColors[color as keyof typeof scoreTextColors] } : undefined}>{value}</div>
            </div>
        </div>
    )
}