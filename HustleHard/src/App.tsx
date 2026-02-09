
import Habits from "./pages/Habits.tsx";
import { HabitsProvider } from "./context/HabitsContext.tsx";

function App() {

    return (
        <HabitsProvider>
            <Habits />
        </HabitsProvider>
    )
}

export default App
