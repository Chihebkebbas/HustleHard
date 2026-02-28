import { createContext, useContext, useState, type ReactNode } from 'react';

export type Exercise = {
    name: string;
    setsRep: string;
};

export type Session = {
    name: string;
    workoutType: string;
    muscleGroups: string;
    completed: boolean;
    exercises: Exercise[];
};

export type Routine = {
    id: string;
    title: string;
    icon: string;
    titleColor: string;
    items: string[];
    completed: boolean;
};

export type ActiveProgram = {
    title: string;
    description: string;
    sessions: number;
    tonnage: number;
    regularity: number;
    progressPercent: number;
};

type ProgramsContextType = {
    activeProgram: ActiveProgram;
    schedule: Session[];
    routines: Routine[];
    dailyWorkout: Session | null;
    toggleSession: (index: number) => void;
    toggleRoutine: (id: string) => void;
    toggleDailyWorkout: () => void;
};

// Initial Data
const INITIAL_PROGRAM: ActiveProgram = {
    title: "Push Pull Legs",
    description: "Focus Hypertrophie • Cycle 2 • Semaine 4<br>Un programme complet sur 6 jours pour maximiser la prise de masse.",
    sessions: 24,
    tonnage: 680,
    regularity: 92,
    progressPercent: 75
};

const INITIAL_SCHEDULE: Session[] = [
    { name: 'Séance 1', workoutType: 'Push A', muscleGroups: 'Pecs, Épaules, Triceps', completed: true, exercises: [] },
    { name: 'Séance 2', workoutType: 'Pull A', muscleGroups: 'Dos, Biceps, Arrière d\'épaule', completed: false, exercises: [] },
    { name: 'Séance 3', workoutType: 'Legs A', muscleGroups: 'Quads, Ischios, Mollets', completed: false, exercises: [] },
    { name: 'Séance 4', workoutType: 'Push B', muscleGroups: 'Focus Force', completed: false, exercises: [] },
    { name: 'Séance 5', workoutType: 'Pull B', muscleGroups: 'Focus Densité', completed: false, exercises: [] },
    { name: 'Séance 6', workoutType: 'Legs B', muscleGroups: 'Focus Fessiers', completed: false, exercises: [] }
];

const INITIAL_ROUTINES: Routine[] = [
    { id: '1', title: 'Morning', icon: '☀️', titleColor: '#FF9500', items: ["Boire 500ml d'eau", "Méditation (10 min)", "Lecture (10 pages)"], completed: false },
    { id: '2', title: 'Night', icon: '🌙', titleColor: '#5856D6', items: ["Journaling / Planner", "Pas d'écrans", "Tisane / Relaxation"], completed: false }
];

const INITIAL_DAILY_WORKOUT: Session = {
    name: "Aujourd'hui",
    workoutType: "Push Day A",
    muscleGroups: "Hypertrophie • 45 min",
    completed: false,
    exercises: [
        { name: "Bench Press", setsRep: "4x10" },
        { name: "Military Press", setsRep: "3x12" },
        { name: "Dips", setsRep: "3xMax" },
        { name: "Lateral Raises", setsRep: "3x15" }
    ]
};

const ProgramsContext = createContext<ProgramsContextType | undefined>(undefined);

export function ProgramsProvider({ children }: { children: ReactNode }) {
    const [activeProgram] = useState<ActiveProgram>(INITIAL_PROGRAM);
    const [schedule, setSchedule] = useState<Session[]>(INITIAL_SCHEDULE);
    const [routines, setRoutines] = useState<Routine[]>(INITIAL_ROUTINES);
    const [dailyWorkout, setDailyWorkout] = useState<Session | null>(INITIAL_DAILY_WORKOUT);

    const toggleSession = (index: number) => {
        setSchedule(prev => prev.map((s, i) => i === index ? { ...s, completed: !s.completed } : s));
    };

    const toggleRoutine = (id: string) => {
        setRoutines(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    };

    const toggleDailyWorkout = () => {
        if (dailyWorkout) {
            setDailyWorkout({ ...dailyWorkout, completed: !dailyWorkout.completed });
        }
    };

    return (
        <ProgramsContext.Provider value={{
            activeProgram,
            schedule,
            routines,
            dailyWorkout,
            toggleSession,
            toggleRoutine,
            toggleDailyWorkout
        }}>
            {children}
        </ProgramsContext.Provider>
    );
}

export function usePrograms() {
    const context = useContext(ProgramsContext);
    if (context === undefined) {
        throw new Error('usePrograms must be used within a ProgramsProvider');
    }
    return context;
}
