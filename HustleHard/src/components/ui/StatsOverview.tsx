import styles from './StatsOverview.module.css'
import StatRing from "./StatRing.tsx";

export default function StatsOverview() {

    const streak = 12;

    return (
        <section className={styles.statsOverviewCard}>
            <div className={styles.streakContainer}>
                <div className={styles.streakIconBox}>🔥</div>
                <div className={styles.streakInfo}>
                    <div className={styles.count}>{streak}</div>
                    <div className={styles.label}>Jours Streak</div>
                </div>
            </div>
            <div className={styles.progressGroup}>
                <StatRing color={"orange"} label={"Routine"} />
                <StatRing color={"bleu"} label={"Tâches"} />
                <StatRing color={"purple"} label={"Habit."} />

            </div>

            <div className={styles.quoteContainer}>
                <div className={styles.quoteText}>"La discipline est le pont entre les objectifs et l'accomplissement."</div>
                <div className={styles.quoteAuthor}>
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #30CFD0, #330867)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 800,
                        }}
                    >
                        IA Insight
                    </span>
                    <span>• Jim Rohn</span>
                </div>
            </div>
        </section>
    )
}