import styles from './HabitsHomeItem.module.css'

type HabitProps = {
  name: string
  icon: string
  frequency: number
  color: string
}

export default function HabitsHomeItem({habit}: HabitProps) {

  function frequencyCircles(key: number) {
    return (
      <td key={key}>
        <div className={styles.checkRow}>
          {Array.from({ length: habit.frequency }).map((_, j) => (
            <div key={j} className={styles.dayCircle}></div>
          ))}
        </div>
      </td>
    )
  }

  return (
    <tr>
      <td>
        <div className={styles.habitNameFlex}>
          <div className={styles.habitIconSq} style={{ color: habit.color }}>
            {habit.icon}
          </div>
          {habit.name}
        </div>
      </td>

      <td>
        <div className={styles.freqBadge}>
          <input
            type="text"
            className={styles.freqInput}
            value={habit.frequency}
            readOnly
          />{' '}
          / sem
        </div>
      </td>

      {Array.from({ length: 4 }).map((_, j) => frequencyCircles(j))}

      <td>
        <div className={styles.habitActions}>
          <button className={styles.actionBtn} title="Modifier">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>

          <button className={`${styles.actionBtn} ${styles.delete}`.trim()} title="Supprimer">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}