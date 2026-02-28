import { createContext, useContext, useState, type ReactNode } from 'react';

export type Task = {
    id: number;
    text: string;
    completed: boolean;
};

type TasksContextType = {
    tasksToday: Task[];
    tasksTomorrow: Task[];
    addTask: (text: string, isToday: boolean) => void;
    toggleTask: (id: number, isToday: boolean) => void;
    deleteTask: (id: number, isToday: boolean) => void;
};

const INITIAL_TASKS_TODAY: Task[] = [
    { id: 1, text: "Envoyer le rapport UX", completed: false },
    { id: 2, text: "Réunion équipe 14h", completed: true },
    { id: 3, text: "Acheter courses dîner", completed: false },
    { id: 4, text: "Lire documentation Spring", completed: false },
];

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasksToday, setTasksToday] = useState<Task[]>(INITIAL_TASKS_TODAY);
    const [tasksTomorrow, setTasksTomorrow] = useState<Task[]>([]);

    const addTask = (text: string, isToday: boolean) => {
        const newTask: Task = {
            id: Date.now(),
            text,
            completed: false
        };

        if (isToday) {
            setTasksToday(prev => [...prev, newTask]);
        } else {
            setTasksTomorrow(prev => [...prev, newTask]);
        }
    };

    const toggleTask = (id: number, isToday: boolean) => {
        if (isToday) {
            setTasksToday(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
        } else {
            setTasksTomorrow(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
        }
    };

    const deleteTask = (id: number, isToday: boolean) => {
        if (isToday) {
            setTasksToday(prev => prev.filter(t => t.id !== id));
        } else {
            setTasksTomorrow(prev => prev.filter(t => t.id !== id));
        }
    };

    return (
        <TasksContext.Provider value={{ tasksToday, tasksTomorrow, addTask, toggleTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TasksContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
}
