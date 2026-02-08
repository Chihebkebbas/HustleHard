import styles from './HabitsHomeCard.module.css'
import AddButton from "./AddButton.tsx";
import HabitsHomeItem from "./HabitsHomeItem.tsx";
import {useState, useRef} from "react";

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

type habit = {
    id: number,
    name: string,
    icon: string,
    frequency: number,
}

const initialHabits : habit = [
    {
        id: 1,
        name: 'Lecture',
        icon: '📖',
        frequency: 7,
    },
    {
        id: 2,
        name: 'Gym/Sport',
        icon: '💪',
        frequency: 4,
    },
    {
        id: 3,
        name: 'Duolingo',
        icon: '🦜',
        frequency: 4,
    },

]



export default function HabitsHomeCard() {

    const [homeHabits, setHomeHabits] = useState<habit>(initialHabits);

    const newHabit: habit = {
        id: homeHabits.length + 1,
        name: 'Nouvelle Habitude',
        icon: '🦾',
        frequency: 4,
    }


    function handleAddHabit() {
        setHomeHabits([...homeHabits, newHabit]);
    }

    const { weeks } = getRolling4WeeksLabel()
    return (
        <section className={styles.habitSection}>
            <div className={styles.tableHeader}>Suivi Mensuel</div>
            <div className={styles.habitTableWrapper}>
                <table className={styles.habitTable} >
                    <thead>
                    <tr>
                        <th style={{width: '25%'}}>Habitude</th>
                        <th style={{width: '15%'}}>Fréquence</th>
                        {weeks.map((w) => (
                            <th key={w.label}>
                                {w.label}{' '}
                                <span style={{fontWeight: '400', opacity: '0.6', fontSize: '0.75rem'}}>
                                    ({formatDayMonth(w.startDate)} - {formatDayMonth(w.endDate)})
                                </span>
                            </th>
                        ))}
                        <th style={{width: '5%'}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        homeHabits.map((habit) => {
                            return (
                                <HabitsHomeItem key={habit.id} habit={habit} homeHabits={homeHabits} setHomeHabits={setHomeHabits} />
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>

            <AddButton onClick={() => handleAddHabit()}>Ajouter une habitude</AddButton>
        </section>
    )
}