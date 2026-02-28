import { createContext, useContext, useState, type ReactNode } from 'react';

export type HistoryTask = {
    id: string;
    label: string;
    completed: boolean;
};

export type HistoryDay = {
    id: string;
    dayName: string;
    date: string;
    progressPercent: number;
    isExpandedInitially?: boolean;
    tasks: HistoryTask[];
};

const initialHistoryData: HistoryDay[] = [
    {
        id: '1',
        dayName: "Aujourd'hui",
        date: "Aujourd'hui",
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
        date: "Hier",
        progressPercent: 100,
        tasks: [
            { id: 't4', label: 'Routine Morning', completed: true },
            { id: 't5', label: 'Gym / Sport', completed: true },
            { id: 't6', label: 'Lecture', completed: true },
            { id: 't7', label: 'Routine Soir', completed: true }
        ]
    }
];

type HistoryContextType = {
    historyData: HistoryDay[];
    addHistoryDay: (day: HistoryDay) => void;
    deleteHistoryDay: (id: string) => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
    const [historyData, setHistoryData] = useState<HistoryDay[]>(initialHistoryData);

    const addHistoryDay = (day: HistoryDay) => {
        setHistoryData(prev => [day, ...prev]);
    };

    const deleteHistoryDay = (id: string) => {
        setHistoryData(prev => prev.filter(d => d.id !== id));
    };

    return (
        <HistoryContext.Provider value={{ historyData, addHistoryDay, deleteHistoryDay }}>
            {children}
        </HistoryContext.Provider>
    );
}

export function useHistory() {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
}
