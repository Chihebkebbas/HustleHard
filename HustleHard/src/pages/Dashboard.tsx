import Sidebar from "../components/layout/Sidebar.tsx";
import TopBar from "../components/layout/TopBar.tsx";
import StatsOverview from "../components/ui/StatsOverview.tsx";
import ReminderCard from "../components/ui/ReminderCard.tsx";
import HabitsHomeCard from "../components/ui/HabitsHomeCard.tsx";
import RoutineCard from "../components/ui/RoutineCard.tsx";
import WorkoutCard from "../components/ui/WorkoutCard.tsx";
import TaskPanel from "../components/ui/TaskPanel.tsx";
import { usePrograms } from '../context/ProgramsContext.tsx';
import { useProfile } from '../context/ProfileContext.tsx';
import styles from './Dashboard.module.css';

export default function Dashboard() {
    const { routines, toggleRoutine, dailyWorkout, toggleDailyWorkout } = usePrograms();
    const { profile } = useProfile();
    const date = new Date();

    const fomatted = new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        month: "long",
        day: "2-digit",
    }).format(date);

    const today = fomatted.charAt(0).toUpperCase() + fomatted.slice(1);
    const username = profile.firstName;

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <TopBar isNotif={true} notificationIcon={true} title={`Bonjour ${username}`} subTitle={today} buttonClassName={"buttonAi"} buttonText={"Demander le Bilan"} svgPath={"M12 2L14.4 7.2L20 9.6L14.4 12L12 17.2L9.6 12L4 9.6L9.6 7.2L12 2Z"} />

                <StatsOverview />

                <div className={styles.remindersGrid}>
                    <ReminderCard title={'Eau'} icon={'💧'} value={'1.5 L'} color={'blue'} />
                    <ReminderCard title={'Sommeil'} icon={'😴'} value={'7h 30'} color={'yellow'} />
                    <ReminderCard title={'Protéines'} icon={'🍗'} value={'+100 g'} color={'green'} />
                    <ReminderCard title={'Marche'} icon={'👣'} value={'+7000'} color={'purple'} />
                    <ReminderCard title={'Score Hier'} icon={'🤖'} value={'88%'} color={'yellow'} score={true} />
                </div>

                <HabitsHomeCard />

                {/* Split View */}
                <section className={styles.dashboardSplit}>
                    {/* Left: Routines & Workout */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Routines Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {routines.map(routine => (
                                <RoutineCard
                                    key={routine.id}
                                    title={routine.title}
                                    icon={routine.icon}
                                    titleColor={routine.titleColor}
                                    items={routine.items}
                                    completed={routine.completed}
                                    onToggle={() => toggleRoutine(routine.id)}
                                />
                            ))}
                        </div>

                        {/* Workout Card */}
                        {dailyWorkout && (
                            <WorkoutCard
                                title={dailyWorkout.workoutType}
                                duration={dailyWorkout.muscleGroups}
                                type={dailyWorkout.name}
                                exercises={dailyWorkout.exercises}
                                completed={dailyWorkout.completed}
                                onToggle={toggleDailyWorkout}
                            />
                        )}
                    </div>

                    {/* Right: Tasks */}
                    <div className="tasks-panel-wrapper">
                        <TaskPanel />
                    </div>
                </section>

            </main>
        </>
    )
}