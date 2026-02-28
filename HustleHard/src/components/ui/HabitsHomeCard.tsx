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

function getPast4WeeksLabel() {
    const now = new Date()

    const weeks = Array.from({ length: 4 }, (_, i) => {
        const weeksAgo = 3 - i;
        const startDate = addDays(now, -(weeksAgo * 7 + 6));
        const endDate = addDays(now, -(weeksAgo * 7));

        let label = `Sem. -${weeksAgo}`;
        if (weeksAgo === 0) label = "Cette sem.";

        return {
            label,
            startDate,
            endDate,
            weekIndex: i
        }
    })

    return { weeks }
}


export default function HabitsHomeCard() {
    const { habits, addHabit } = useHabits();

    const handleAddHabit = () => {
        addHabit({
            name: 'Nouvelle Habitude',
            icon: '🦾',
            freq: 7,
        });
    };

    const { weeks } = getPast4WeeksLabel()

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
                                <th key={w.label} style={{ textAlign: 'center', width: '11%' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: w.weekIndex === 3 ? '700' : '600', color: w.weekIndex === 3 ? 'var(--brand-color)' : 'inherit' }}>
                                        {w.label}
                                    </div>
                                    <div style={{ fontWeight: '400', opacity: '0.6', fontSize: '0.7rem' }}>
                                        {formatDayMonth(w.startDate)} - {formatDayMonth(w.endDate)}
                                    </div>
                                </th>
                            ))}
                            <th style={{ width: '8%', textAlign: 'center' }}>Auj.</th>
                            <th style={{ width: '8%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            habits.map((habit) => {
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