import { createContext, useContext, useState, type ReactNode } from 'react';

export type Habit = {
    id: number;
    name: string;
    icon: string;
    freq: number; // Changed from 'frequency' to match Habits.tsx or vise versa. Let's use 'freq' as per Habits.tsx but I should align. 
    // HabitsHomeCard uses 'frequency', Habits.tsx uses 'freq'. 
    // I will use 'freq' to avoid changing Habits.tsx too much, and update HabitsHomeCard.
    streak: number;
    history: boolean[]; // last 7 days
    completedToday: boolean;
};

// Initial data from Habits.tsx
const initialHabitsData: Habit[] = [
    { id: 1, name: 'Méditation', icon: '🧘', freq: 7, streak: 12, history: [true, true, true, true, false, true, true], completedToday: true },
    { id: 2, name: 'Lecture', icon: '📖', freq: 7, streak: 5, history: [false, true, true, true, true, true, false], completedToday: false },
    { id: 3, name: 'Sport', icon: '🏋️', freq: 5, streak: 24, history: [true, true, true, false, true, true, true], completedToday: true },
    { id: 4, name: 'Boire de l\'eau', icon: '💧', freq: 7, streak: 0, history: [false, false, true, false, false, false, false], completedToday: false }
];

type HabitsContextType = {
    habits: Habit[];
    addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'history' | 'completedToday'>) => void;
    updateHabit: (id: number, updates: Partial<Habit>) => void;
    deleteHabit: (id: number) => void;
    toggleToday: (id: number) => void;
};

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export function HabitsProvider({ children }: { children: ReactNode }) {
    const [habits, setHabits] = useState<Habit[]>(initialHabitsData);

    const addHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'history' | 'completedToday'>) => {
        const newHabit: Habit = {
            id: Date.now(),
            ...habitData,
            streak: 0,
            history: [false, false, false, false, false, false, false],
            completedToday: false
        };
        setHabits(prev => [...prev, newHabit]);
    };

    const updateHabit = (id: number, updates: Partial<Habit>) => {
        setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
    };

    const deleteHabit = (id: number) => {
        setHabits(prev => prev.filter(h => h.id !== id));
    };

    const toggleToday = (id: number) => {
        setHabits(prev => prev.map(h => {
            if (h.id === id) {
                const newCompleted = !h.completedToday;
                return {
                    ...h,
                    completedToday: newCompleted,
                    streak: newCompleted ? h.streak + 1 : h.streak - 1
                };
            }
            return h;
        }));
    };

    return (
        <HabitsContext.Provider value={{ habits, addHabit, updateHabit, deleteHabit, toggleToday }}>
            {children}
        </HabitsContext.Provider>
    );
}

export function useHabits() {
    const context = useContext(HabitsContext);
    if (context === undefined) {
        throw new Error('useHabits must be used within a HabitsProvider');
    }
    return context;
}
