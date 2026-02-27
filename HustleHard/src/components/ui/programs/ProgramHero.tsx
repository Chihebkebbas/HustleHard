import styles from './ProgramHero.module.css';
import { useEffect, useState } from 'react';

interface ProgramHeroProps {
    title: string;
    description: string;
    sessions: number;
    tonnage: number;
    regularity: number;
    progressPercent: number;
}

export default function ProgramHero({
    title,
    description,
    sessions,
    tonnage,
    regularity,
    progressPercent
}: ProgramHeroProps) {
    const [dashArray, setDashArray] = useState(0);
    const radius = 54;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        // Simple animation timeout
        const timeout = setTimeout(() => {
            const offset = circumference - (progressPercent / 100) * circumference;
            setDashArray(offset);
        }, 100);
        return () => clearTimeout(timeout);
    }, [progressPercent, circumference]);

    return (
        <section className={styles.programHero}>
            <div className={styles.heroContent}>
                <span className={styles.heroTag}>En cours</span>
                <h2 className={styles.heroTitle}>{title}</h2>
                <p className={styles.heroDescription} dangerouslySetInnerHTML={{ __html: description }}></p>

                <div className={styles.heroStats}>
                    <div className={styles.heroStatItem}>
                        <span className={styles.heroStatValue}>{sessions}</span>
                        <span className={styles.heroStatLabel}>Séances</span>
                    </div>
                    <div className={styles.heroStatItem}>
                        <span className={styles.heroStatValue}>{tonnage}</span>
                        <span className={styles.heroStatLabel}>Tonnage (kg)</span>
                    </div>
                    <div className={styles.heroStatItem}>
                        <span className={styles.heroStatValue}>{regularity}%</span>
                        <span className={styles.heroStatLabel}>Regularité</span>
                    </div>
                </div>
            </div>
            <div className={styles.programProgressCircle}>
                <svg>
                    <circle className={styles.circleBg} cx="60" cy="60" r={radius}></circle>
                    <circle
                        className={styles.circleProgress}
                        cx="60"
                        cy="60"
                        r={radius}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: dashArray || circumference
                        }}
                    ></circle>
                </svg>
                <div className={styles.progressText}>
                    <span className={styles.progressPercent}>{progressPercent}%</span>
                    <span className={styles.progressLabel}>Global</span>
                </div>
            </div>
        </section>
    );
}
