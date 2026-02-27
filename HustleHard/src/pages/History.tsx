import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import HistoryItem from '../components/ui/history/HistoryItem';
import styles from './History.module.css';

const HISTORY_DATA = [
    {
        id: '1',
        dayName: "Aujourd'hui",
        date: "24 Janvier",
        progressPercent: 80,
        isExpandedInitially: true,
        tasks: [
            { id: 't1', label: 'Routine Morning', completed: true },
            { id: 't2', label: 'Gym / Sport', completed: true },
            { id: 't3', label: 'Lecture (10 pages)', completed: false }
        ]
    },
    {
        id: '2',
        dayName: "Hier",
        date: "23 Janvier",
        progressPercent: 100,
        tasks: [
            { id: 't4', label: 'Routine Morning', completed: true },
            { id: 't5', label: 'Gym / Sport', completed: true },
            { id: 't6', label: 'Lecture', completed: true },
            { id: 't7', label: 'Routine Soir', completed: true }
        ]
    },
    {
        id: '3',
        dayName: "Lundi",
        date: "22 Janvier",
        progressPercent: 40,
        tasks: [
            { id: 't8', label: 'Routine Morning', completed: true },
            { id: 't9', label: 'Gym / Sport', completed: false }
        ]
    }
];

export default function History() {
    return (
        <>
            <Sidebar />
            <main className="main-content">
                <TopBar
                    title="Mon Historique"
                    subTitle="Suivi de vos entraînements passés"
                    isNotif={false}
                    notificationIcon={true}
                    headerButton={false}
                />

                <section className={styles.historyStatsGrid}>
                    <div className={styles.historyMetricCard}>
                        <h3>Total Tâches</h3>
                        <div className={styles.metricValue}>142</div>
                        <div className={styles.widgetIcon} style={{ background: '#E1F5FE', color: '#0288D1' }}>📝</div>
                    </div>

                    <div className={styles.historyMetricCard}>
                        <h3>Réussite</h3>
                        <div className={`${styles.metricValue} ${styles.metricGreen}`}>87%</div>
                        <div className={styles.widgetIcon} style={{ background: '#E8F5E9', color: '#34C759' }}>📈</div>
                    </div>

                    <div className={styles.historyMetricCard}>
                        <h3>Série</h3>
                        <div className={`${styles.metricValue} ${styles.metricOrange}`}>12 J</div>
                        <div className={styles.widgetIcon} style={{ background: '#FFF3E0', color: '#FF9500' }}>🔥</div>
                    </div>

                    <div className={`${styles.historyMetricCard} ${styles.aiCard}`}>
                        <h3>Analyse IA</h3>
                        <div className={styles.metricValue} style={{ fontSize: '1rem', fontWeight: 500 }}>
                            "Productivité en hausse. Continue comme ça!"
                        </div>
                        <div className={styles.widgetIcon} style={{ background: '#FFFFFF', color: '#5856D6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>✨</div>
                    </div>
                </section>

                <section className={styles.singleCardContainer}>
                    <div className={styles.historyToolbar}>
                        <div className={styles.toolbarLabel}>Entrées Journalières</div>
                        <div className={styles.filterGroup}>
                            <button className={`${styles.filterBtn} ${styles.active}`}>Tous</button>
                            <button className={styles.filterBtn}>Complets</button>
                            <button className={styles.filterBtn}>Manqués</button>
                        </div>
                    </div>

                    <div className={styles.historyListView}>
                        {HISTORY_DATA.map(day => (
                            <HistoryItem
                                key={day.id}
                                dayName={day.dayName}
                                date={day.date}
                                progressPercent={day.progressPercent}
                                tasks={day.tasks}
                                isExpandedInitially={day.isExpandedInitially}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
