import { createContext, useContext, useState, type ReactNode } from 'react';

export type Habit = {
    id: number;
    name: string;
    icon: string;
    freq: number;
    streak: number;
    history: boolean[]; // last 7 days
    completedToday: boolean;
    completionsByWeek: number[];
};

// Initial data from Habits.tsx
const initialHabitsData = [
    { id: 1, name: 'Méditation', icon: '🧘', freq: 7, streak: 12, history: [true, true, true, true, false, true, true], completedToday: true, completionsByWeek: [5, 6, 7, 5] },
    { id: 2, name: 'Lecture', icon: '📖', freq: 7, streak: 5, history: [false, true, true, true, true, true, false], completedToday: false, completionsByWeek: [3, 4, 3, 2] },
    { id: 3, name: 'Sport', icon: '🏋️', freq: 5, streak: 24, history: [true, true, true, false, true, true, true], completedToday: true, completionsByWeek: [4, 5, 4, 3] },
    { id: 4, name: 'Boire de l\'eau', icon: '💧', freq: 7, streak: 0, history: [false, false, true, false, false, false, false], completedToday: false, completionsByWeek: [2, 1, 3, 1] }
];

type HabitsContextType = {
    habits: Habit[];
    addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'history' | 'completedToday' | 'completionsByWeek'>) => void;
    updateHabit: (id: number, updates: Partial<Habit>) => void;
    deleteHabit: (id: number) => void;
    toggleToday: (id: number) => void;
    setWeeklyCompletion: (id: number, weekIndex: number, count: number) => void;
};

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export function HabitsProvider({ children }: { children: ReactNode }) {
    const [habits, setHabits] = useState<Habit[]>(initialHabitsData);

    const addHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'history' | 'completedToday' | 'completionsByWeek'>) => {
        const newHabit: Habit = {
            id: Date.now(),
            ...habitData,
            streak: 0,
            history: [false, false, false, false, false, false, false],
            completedToday: false,
            completionsByWeek: [0, 0, 0, 0]
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
                const newWeekly = [...(h.completionsByWeek || [0, 0, 0, 0])];
                newWeekly[3] = newCompleted ? Math.min(newWeekly[3] + 1, h.freq) : Math.max(newWeekly[3] - 1, 0);

                return {
                    ...h,
                    completedToday: newCompleted,
                    completionsByWeek: newWeekly,
                    streak: newCompleted ? h.streak + 1 : h.streak - 1
                };
            }
            return h;
        }));
    };

    const setWeeklyCompletion = (id: number, weekIndex: number, count: number) => {
        setHabits(prev => prev.map(h => {
            if (h.id === id) {
                const newWeekly = [...(h.completionsByWeek || [0, 0, 0, 0])];
                newWeekly[weekIndex] = count;
                return { ...h, completionsByWeek: newWeekly };
            }
            return h;
        }));
    };

    return (
        <HabitsContext.Provider value={{ habits, addHabit, updateHabit, deleteHabit, toggleToday, setWeeklyCompletion }}>
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
