
import TopBar from "./components/layout/TopBar.tsx";
import Sidebar from "./components/layout/Sidebar.tsx";
import ReminderCard from "./components/ui/ReminderCard.tsx";
import StatsOverview from "./components/ui/StatsOverview.tsx";
import HabitsHomeCard from "./components/ui/HabitsHomeCard.tsx";
import RoutineCard from "./components/ui/RoutineCard.tsx";
import WorkoutCard from "./components/ui/WorkoutCard.tsx";
import TaskPanel from "./components/ui/TaskPanel.tsx";

function App() {

    const workoutExercises = [
        { name: "Bench Press", setsRep: "4x10" },
        { name: "Military Press", setsRep: "3x12" },
        { name: "Dips", setsRep: "3xMax" },
        { name: "Lateral Raises", setsRep: "3x15" }
    ];

    return (
        <>
            <Sidebar />
            <main className={"main-content"}>
                <TopBar isNotif={true} notificationIcon={true} username={"Chiheb"} buttonClassName={"buttonAi"} buttonText={"Demander le Bilan"} svgPath={"M12 2L14.4 7.2L20 9.6L14.4 12L12 17.2L9.6 12L4 9.6L9.6 7.2L12 2Z"} />

                <StatsOverview />

                <div className={"reminders-grid"}>
                    <ReminderCard title={'Eau'} icon={'💧'} value={'1.5 L'} color={'blue'} />
                    <ReminderCard title={'Sommeil'} icon={'😴'} value={'7h 30'} color={'yellow'} />
                    <ReminderCard title={'Protéines'} icon={'🍗'} value={'+100 g'} color={'green'} />
                    <ReminderCard title={'Marche'} icon={'👣'} value={'+7000'} color={'purple'} />
                    <ReminderCard title={'Score Hier'} icon={'🤖'} value={'88%'} color={'yellow'} score={true} />
                </div>

                <HabitsHomeCard />

                {/* Split View */}
                <section className="dashboard-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', paddingBottom: '3rem' }}>
                    {/* Left: Routines & Workout */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Routines Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <RoutineCard
                                title="Morning"
                                icon="☀️"
                                titleColor="#FF9500"
                                items={["Boire 500ml d'eau", "Méditation (10 min)", "Lecture (10 pages)"]}
                            />
                            <RoutineCard
                                title="Night"
                                icon="🌙"
                                titleColor="#5856D6"
                                items={["Journaling / Planner", "Pas d'écrans", "Tisane / Relaxation"]}
                            />
                        </div>

                        {/* Workout Card */}
                        <WorkoutCard
                            title="Push Day A"
                            duration="45 min"
                            type="Hypertrophie"
                            exercises={workoutExercises}
                        />
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

export default App
