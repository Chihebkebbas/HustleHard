import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import TaskPanel from '../components/ui/TaskPanel';
import styles from './Tasks.module.css';

export default function Tasks() {
    return (
        <>
            <Sidebar />
            <main className="main-content">
                <TopBar
                    title="Mes Tâches"
                    subTitle="Organisez votre journée"
                    isNotif={true}
                    notificationIcon={true}
                    headerButton={false}
                />

                <section className={styles.tasksMetrics}>
                    <div className={styles.taskMetricCard}>
                        <h3>À faire</h3>
                        <div className={`${styles.taskMetricValue} ${styles.metricBlue}`}>4</div>
                        <div className={styles.widgetIcon} style={{ background: '#E1F5FE', color: '#0288D1' }}>📝</div>
                    </div>
                    <div className={styles.taskMetricCard}>
                        <h3>Accomplissement</h3>
                        <div className={`${styles.taskMetricValue} ${styles.metricOrange}`}>25%</div>
                        <div className={styles.widgetIcon} style={{ background: '#FFF3E0', color: '#F57C00' }}>📈</div>
                    </div>
                    <div className={styles.taskMetricCard}>
                        <h3>Série</h3>
                        <div className={`${styles.taskMetricValue} ${styles.metricFire}`}>12 J</div>
                        <div className={styles.widgetIcon} style={{ background: '#FFEBEE', color: '#FF3B30' }}>🔥</div>
                    </div>
                    {/* AI Suggestion Card */}
                    <div className={`${styles.taskMetricCard} ${styles.aiCard}`}>
                        <h3>Suggestion IA</h3>
                        <div className={styles.taskMetricValue}>"Review PR #42"</div>
                        <div className={`${styles.widgetIcon} ${styles.aiIcon}`}>✨</div>
                    </div>
                </section>

                <TaskPanel />

            </main>
        </>
    );
}
