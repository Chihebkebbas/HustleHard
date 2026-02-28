import { createContext, useContext, useState, type ReactNode } from 'react';

export type Goal = {
    id: string;
    title: string;
    quarter: "Q1" | "Q2" | "Q3" | "Q4";
    deadline?: string;
    completed: boolean;
};

type GoalsContextType = {
    goals: Goal[];
    addGoal: (goal: Omit<Goal, 'id'>) => void;
    updateGoal: (id: string, updates: Partial<Goal>) => void;
    toggleGoal: (id: string) => void;
    deleteGoal: (id: string) => void;
};

const INITIAL_GOALS: Goal[] = [
    { id: '1', title: 'Atteindre 85kg de PDC sec', quarter: 'Q1', deadline: '2025-03-31', completed: true },
    { id: '2', title: 'Développer l\'app', quarter: 'Q1', completed: false },
    { id: '3', title: 'Lancer le MVP', quarter: 'Q2', deadline: '2025-06-30', completed: false },
    { id: '4', title: 'Atteindre 100 utilisateurs actifs', quarter: 'Q3', completed: false },
    { id: '5', title: 'Générer 1000€ MRR', quarter: 'Q4', completed: false }
];

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export function GoalsProvider({ children }: { children: ReactNode }) {
    const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

    const addGoal = (goalData: Omit<Goal, 'id'>) => {
        const newGoal: Goal = {
            id: Date.now().toString(),
            ...goalData
        };
        setGoals(prev => [...prev, newGoal]);
    };

    const updateGoal = (id: string, updates: Partial<Goal>) => {
        setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    };

    const toggleGoal = (id: string) => {
        setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    const deleteGoal = (id: string) => {
        setGoals(prev => prev.filter(g => g.id !== id));
    };

    return (
        <GoalsContext.Provider value={{ goals, addGoal, updateGoal, toggleGoal, deleteGoal }}>
            {children}
        </GoalsContext.Provider>
    );
}

export function useGoals() {
    const context = useContext(GoalsContext);
    if (context === undefined) {
        throw new Error('useGoals must be used within a GoalsProvider');
    }
    return context;
}
