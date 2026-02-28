import styles from './HabitsHomeItem.module.css'
import { useState, useEffect } from "react";
import { type Habit, useHabits } from '../../context/HabitsContext.tsx';


type habitsHomeItemProps = {
  habit: Habit,
}

export default function HabitsHomeItem({ habit }: habitsHomeItemProps) {
  const { updateHabit, deleteHabit: contextDeleteHabit, toggleToday } = useHabits();

  const [editable, setEditable] = useState(false);
  // Local state for immediate edit feedback, committed on blur/change
  const [icon, setIcon] = useState(habit.icon);
  const [name, setName] = useState(habit.name);
  const [freq, setFreq] = useState(habit.freq);

  // Sync with prop updates if external changes happen
  useEffect(() => {
    setIcon(habit.icon);
    setName(habit.name);
    setFreq(habit.freq);
  }, [habit]);

  function frequencyCircles(weekIndex: number) {
    const filledCount = habit.completionsByWeek ? habit.completionsByWeek[weekIndex] : 0;

    return (
      <td key={weekIndex}>
        <div className={styles.checkRow}>
          {Array.from({ length: habit.freq }).map((_, j) => {
            const isFilled = j < filledCount;
            const circleClass = isFilled ? `${styles.dayCircle} ${styles.filled}` : styles.dayCircle;

            return (
              <div
                key={j}
                className={circleClass}
              ></div>
            );
          })}
        </div>
      </td>
    )
  }

  function handleDelete(id: number) {
    if (confirm("Supprimer cette habitude ?")) {
      contextDeleteHabit(id);
    }
  }

  const saveUpdates = () => {
    updateHabit(habit.id, { name, icon, freq });
  };

  const toggleEdit = () => {
    if (editable) {
      saveUpdates();
    }
    setEditable(!editable);
  }

  return (
    <tr key={habit.id}>
      <td>
        <div className={styles.habitNameFlex}>
          <div className={styles.habitIconSq}
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newIcon = e.currentTarget.textContent || icon;
              setIcon(newIcon);
              // if we want to save on blur:
              // updateHabit(habit.id, { icon: newIcon });
            }} >
            {habit.icon}
          </div>
          <div
            className={styles.habitName}
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newName = e.currentTarget.textContent || name;
              setName(newName);
              // if we want to save on blur:
              // updateHabit(habit.id, { name: newName });
            }}
          >
            {habit.name}
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
            value={habit.freq}
            disabled={!editable}
            onChange={(e) => {
              let value = Number(e.target.value);

              if (value < 1) value = 1;
              if (value > 7) value = 7;

              setFreq(value);
              // For inputs, we might want to update context immediately or wait for 'save'
              // Let's update context immediately for inputs as it feels snappier, OR wait for toggleEdit.
              // Given the UI shows a check/edit toggle, waiting for toggle is standard.
              // BUT for the input value to reflect local state it must use 'freq' state not 'habit.freq'
            }}
          />
          { /* Actually, better to use the controlled local state 'freq' for input value to allow editing before saving */}
          / sem
        </div>
      </td>

      {Array.from({ length: 4 }).map((_, j) => frequencyCircles(j))}

      <td key="today" style={{ textAlign: 'center', padding: '1rem 0.2rem' }}>
        <div className={styles.dotContainer}>
          <div
            className={`${styles.todayToggle} ${habit.completedToday ? styles.completed : ''}`}
            onClick={() => toggleToday(habit.id)}
            title="Aujourd'hui"
          />
        </div>
      </td>

      <td>
        <div className={styles.habitActions}>
          <button className={styles.actionBtn} title={editable ? "Sauvegarder" : "Modifier"} onClick={toggleEdit}>
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

          <button className={`${styles.actionBtn} ${styles.delete}`.trim()} title="Supprimer" onClick={() => handleDelete(habit.id)}>
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