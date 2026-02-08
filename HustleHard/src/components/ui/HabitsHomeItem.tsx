import styles from './HabitsHomeItem.module.css'
import {useState} from "react";

type habit = {
  id: number,
  name: string,
  icon: string,
  frequency: number,
}

type habitsHomeItemProps = {
  habit: habit,
  setHomeHabits: React.Dispatch<React.SetStateAction<habit[]>>,
}

export default function HabitsHomeItem({habit, setHomeHabits}: habitsHomeItemProps) {

  const [icon, setIcon] = useState(habit.icon);
  const [name, setName] = useState(habit.name);
  const [frequency, setFrequency] = useState(habit.frequency);
  const [editable, setEditable] = useState(false);

  function frequencyCircles(key: number) {
    return (
      <td key={key}>
        <div className={styles.checkRow}>
          {Array.from({ length: frequency }).map((_, j) => (
            <div key={j} className={styles.dayCircle}></div>
          ))}
        </div>
      </td>
    )
  }

  function handleDelete(id: number) {
    setHomeHabits(prevHabits => {
      return prevHabits.filter(habit => habit.id !== id);
    })
  }

  return (
    <tr key={habit.id}>
      <td>
        <div className={styles.habitNameFlex}>
          <div className={styles.habitIconSq}
               contentEditable={editable}
               suppressContentEditableWarning
               onBlur={(e) => {setIcon(e.currentTarget.textContent || icon)}} >
            {icon}
          </div>
          <div
              className={styles.habitName}
              contentEditable={editable}
              suppressContentEditableWarning
              onBlur={(e) => setName(e.currentTarget.textContent || name)}
          >
            {name}
          </div>
        </div>
      </td>

      <td>
        <div className={styles.freqBadge}>
          <input
            type="number"
            min={1}
            max={7}
            className={styles.freqInput}
            value={frequency}
            disabled={!editable}
            onChange={(e) => {
              let value = Number(e.target.value);

              if (value < 1) value = 0;
              if (value > 7) value = 7;

              setFrequency(value);
            }}
          />
          / sem
        </div>
      </td>

      {Array.from({ length: 4 }).map((_, j) => frequencyCircles(j))}

      <td>
        <div className={styles.habitActions}>
          <button className={styles.actionBtn} title="Modifier" onClick={() => setEditable(!editable)}>
            {
              editable ? (
                  <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
              ) : (
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
              )
            }

          </button>

          <button className={`${styles.actionBtn} ${styles.delete}`.trim()} title="Supprimer" onClick={()=> handleDelete(habit.id)}>
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