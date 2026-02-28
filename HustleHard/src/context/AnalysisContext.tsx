import { createContext, useContext, useState, type ReactNode } from 'react';

export type AnalysisReport = {
    id: number;
    date: string;
    title: string;
    summary: string;
    score: number;
    status: string;
};

const initialAnalysisData: AnalysisReport[] = [
    { id: 1, date: "Aujourd'hui", title: "Semaine 4", summary: "Progression constante en force. Volume optimal.", score: 92, status: 'Excellent' },
    { id: 2, date: "Hier", title: "Séance PPL A", summary: "Intensité bonne mais repos court.", score: 78, status: 'Bon' },
    { id: 3, date: "01 Janv.", title: "Décembre", summary: "Cible de fréquence manquée.", score: 65, status: 'Moyen' }
];

type AnalysisContextType = {
    reports: AnalysisReport[];
    addReport: (report: Omit<AnalysisReport, 'id'>) => void;
    deleteReport: (id: number) => void;
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
    const [reports, setReports] = useState<AnalysisReport[]>(initialAnalysisData);

    const addReport = (reportData: Omit<AnalysisReport, 'id'>) => {
        const newReport: AnalysisReport = {
            id: Date.now(),
            ...reportData
        };
        // Add newest to the top
        setReports(prev => [newReport, ...prev]);
    };

    const deleteReport = (id: number) => {
        setReports(prev => prev.filter(r => r.id !== id));
    };

    return (
        <AnalysisContext.Provider value={{ reports, addReport, deleteReport }}>
            {children}
        </AnalysisContext.Provider>
    );
}

export function useAnalysis() {
    const context = useContext(AnalysisContext);
    if (context === undefined) {
        throw new Error('useAnalysis must be used within an AnalysisProvider');
    }
    return context;
}
