import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import AnalysisCard from '../components/ui/analysis/AnalysisCard';
import styles from './Analysis.module.css';
import ScoreCircle from '../components/ui/analysis/ScoreCircle';

// Mock Data
const RECENT_ANALYSIS = [
    { id: 1, date: "Aujourd'hui", title: "Semaine 4", summary: "Progression constante en force. Volume optimal.", score: 92, status: 'Excellent' },
    { id: 2, date: "Hier", title: "Séance PPL A", summary: "Intensité bonne mais repos court.", score: 78, status: 'Bon' },
    { id: 3, date: "01 Janv.", title: "Décembre", summary: "Cible de fréquence manquée.", score: 65, status: 'Moyen' }
];

export default function Analysis() {
    const [selectedReport, setSelectedReport] = useState<typeof RECENT_ANALYSIS[0] | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleLaunchAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            alert("Analyse IA terminée !");
            setIsAnalyzing(false);
            setSelectedReport({
                id: Date.now(),
                title: "Nouveau Bilan",
                date: "À l'instant",
                summary: "Excellente semaine, continuez ainsi.",
                score: 95,
                status: 'Excellent'
            });
        }, 1000);
    };

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <TopBar
                    title="Analyse Intelligente"
                    subTitle="Vos performances décryptées par l'IA"
                    isNotif={false}
                    notificationIcon={true}
                    headerButton={false}
                />

                <div className={styles.analysisHero}>
                    <div className={styles.heroContent}>
                        <div className={styles.aiBadge}>✨ Bilan IA</div>
                        <h2 className={styles.heroTitle}>Votre analyse de performance</h2>
                        <p className={styles.heroDesc}>
                            Obtenez un point de vue objectif sur vos progrès et des conseils concrets pour avancer.
                        </p>
                        <button
                            className={styles.btnLaunch}
                            onClick={handleLaunchAnalysis}
                            style={{ opacity: isAnalyzing ? 0.7 : 1 }}
                        >
                            {isAnalyzing ? 'Analyse...' : 'Lancer le bilan'}
                        </button>
                    </div>
                </div>

                <div className={styles.analysisHistory}>
                    <h3 className={styles.historyTitle}>Historique</h3>
                    <div className={styles.analysisGrid}>
                        {RECENT_ANALYSIS.map(report => (
                            <AnalysisCard
                                key={report.id}
                                date={report.date}
                                score={report.score}
                                title={report.title}
                                summary={report.summary}
                                onClick={() => setSelectedReport(report)}
                            />
                        ))}
                    </div>
                </div>

                {/* Report Modal */}
                {selectedReport && (
                    <div className={styles.modalOverlay} onClick={() => setSelectedReport(null)}>
                        <div className={styles.reportCard} onClick={e => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className={styles.reportSubtitle}>{selectedReport.date}</span>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{selectedReport.title}</h3>
                                </div>
                                <button className={styles.closeModal} onClick={() => setSelectedReport(null)}>×</button>
                            </div>

                            <div className={styles.modalBody}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #F2F2F7' }}>
                                    <ScoreCircle score={selectedReport.score} />
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Analyse Globale</h4>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>Basé sur vos dernières données</span>
                                    </div>
                                </div>

                                <div className={styles.reportTextContent}>
                                    <h5>Points Positifs</h5>
                                    <ul>
                                        <li>Votre force sur les mouvements de poussée a augmenté de <strong>+5%</strong>.</li>
                                        <li>Vous avez maintenu une régularité parfaite (4 séances) cette semaine.</li>
                                        <li>La répartition du volume d'entraînement est équilibrée.</li>
                                    </ul>

                                    <h5>Axes d'Amélioration</h5>
                                    <ul>
                                        <li>Le temps de sommeil moyen (6h30) est insuffisant pour une récupération optimale.</li>
                                        <li>L'intensité sur les séances jambes pourrait être légèrement augmentée.</li>
                                    </ul>

                                    <div className={styles.insightBox}>
                                        <strong>💡 Conseil du Coach</strong>
                                        <p>Essayez d'ajouter une sieste de 20min les jours d'entraînement lourd pour compenser le manque de sommeil.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
