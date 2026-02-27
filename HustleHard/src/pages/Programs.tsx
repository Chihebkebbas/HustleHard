import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import ProgramHero from '../components/ui/programs/ProgramHero';
import DayCard, { type Session } from '../components/ui/programs/DayCard';
import styles from './Programs.module.css';

const DEFAULT_SESSIONS: Session[] = [
    { name: 'Séance 1', workoutType: 'Push A', muscleGroups: 'Pecs, Épaules, Triceps', completed: true, exercises: [] },
    { name: 'Séance 2', workoutType: 'Pull A', muscleGroups: 'Dos, Biceps, Arrière d\'épaule', completed: false, exercises: [] },
    { name: 'Séance 3', workoutType: 'Legs A', muscleGroups: 'Quads, Ischios, Mollets', completed: false, exercises: [] },
    { name: 'Séance 4', workoutType: 'Push B', muscleGroups: 'Focus Force', completed: false, exercises: [] },
    { name: 'Séance 5', workoutType: 'Pull B', muscleGroups: 'Focus Densité', completed: false, exercises: [] },
    { name: 'Séance 6', workoutType: 'Legs B', muscleGroups: 'Focus Fessiers', completed: false, exercises: [] }
];

export default function Programs() {
    const activeProgram = {
        title: "Push Pull Legs",
        description: "Focus Hypertrophie • Cycle 2 • Semaine 4<br>Un programme complet sur 6 jours pour maximiser la prise de masse.",
        sessions: 24,
        tonnage: 680,
        regularity: 92,
        progressPercent: 75
    };

    const handleSessionClick = (session: Session) => {
        console.log("Session details for:", session);
    };

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <TopBar
                    title="Mes Programmes"
                    subTitle="Gérez vos routines d'entraînement"
                    isNotif={true}
                    notificationIcon={true}
                    headerButton={true}
                    buttonText="+ Créer Pgm"
                    buttonClassName="buttonBrand" // style this in TopBar generic or global
                />

                <div style={{ padding: '0' }}>
                    <ProgramHero {...activeProgram} />
                </div>

                <section className={styles.aiObjectivesSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Objectifs IA</h3>
                        <span className={styles.heroTag}>✨ Smart Targets</span>
                    </div>
                    <div className={styles.objectivesGrid}>
                        {/* Example objective cards */}
                        <div className={styles.objCard}>
                            <div className={styles.objHeader}>
                                <div className={styles.objTitle}>Bench Press</div>
                                <div className={`${styles.objStatus} ${styles.green}`}>En bonne voie</div>
                            </div>
                            <div className={styles.objDesc}>Passer de 80kg à 90kg d'ici la fin du cycle.</div>
                            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#8e8e93' }}>Cible estimée par l'IA</div>
                        </div>
                    </div>
                </section>

                <section className={styles.scheduleSection}>
                    <div className={styles.sectionHeader} style={{ marginBottom: '1.5rem' }}>
                        <h3 className={styles.sectionTitle}>Mes Séances</h3>
                    </div>
                    <div className={styles.scheduleGrid}>
                        {DEFAULT_SESSIONS.map((session, idx) => (
                            <DayCard key={idx} session={session} onClick={handleSessionClick} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
