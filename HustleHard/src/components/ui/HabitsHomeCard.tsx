import styles from './HabitsHomeCard.module.css'
import AddButton from "./AddButton.tsx";
import HabitsHomeItem from "./HabitsHomeItem.tsx";
import { useHabits } from '../../context/HabitsContext.tsx';

const MONTHS_FR_SHORT = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
]

function addDays(date: Date, days: number) {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    return d
}

function formatDayMonth(date: Date) {
    const day = date.getDate()
    const monthLabel = MONTHS_FR_SHORT[date.getMonth()]
    return `${day} ${monthLabel}`
}

function getRolling4WeeksLabel() {
    const now = new Date()

    const weeks = Array.from({ length: 4 }, (_, i) => {
        const startDate = addDays(now, i * 7)
        const endDate = addDays(now, i * 7 + 6)

        return {
            label: `Semaine ${i + 1}`,
            startDate,
            endDate,
        }
    })

    return { weeks }
}


export default function HabitsHomeCard() {
    const { habits, addHabit } = useHabits();

    const handleAddHabit = () => {
        // Since AddButton in HomeCard usually just navigated or opened a modal in the original concept,
        // but here it says "Add Habit", I will make it add a default habit or maybe prompt?
        // The user request was "add button il existe déjà, utilise le".
        // In the original file it added a "Nouvelle Habitude".
        addHabit({
            name: 'Nouvelle Habitude',
            icon: '🦾',
            freq: 4,
        });
    };

    const { weeks } = getRolling4WeeksLabel()
    return (
        <section className={styles.habitSection}>
            <div className={styles.tableHeader}>Suivi Mensuel</div>
            <div className={styles.habitTableWrapper}>
                <table className={styles.habitTable} >
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>Habitude</th>
                            <th style={{ width: '15%' }}>Fréquence</th>
                            {weeks.map((w) => (
                                <th key={w.label}>
                                    {w.label}{' '}
                                    <span style={{ fontWeight: '400', opacity: '0.6', fontSize: '0.75rem' }}>
                                        ({formatDayMonth(w.startDate)} - {formatDayMonth(w.endDate)})
                                    </span>
                                </th>
                            ))}
                            <th style={{ width: '5%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            habits.map((habit) => {
                                // Adapter for HabitsHomeItem if needed, or update HabitsHomeItem to take Habit type.
                                // Looking at HabitsHomeItem usage, it takes 'habit', 'homeHabits', 'setHomeHabits'.
                                // I actually need to check HabitsHomeItem to see if it needs refactoring too.
                                // For now I'm passing valid props if HabitsHomeItem is compatible or I need to refactor it too.
                                // I'll assume I need to refactor HabitsHomeItem next or now.
                                // Let's pass the habit. 
                                // HabitsHomeItem probably expects 'homeHabits' and 'setHomeHabits' for state updates.
                                // I should check HabitsHomeItem.
                                return (
                                    <HabitsHomeItem key={habit.id} habit={habit} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <AddButton onClick={handleAddHabit}>Ajouter une habitude</AddButton>
        </section>
    )
}