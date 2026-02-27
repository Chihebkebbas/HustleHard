import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Habits from "./pages/Habits.tsx";
import Tasks from "./pages/Tasks.tsx";
import Goals from "./pages/Goals.tsx";
import Programs from "./pages/Programs.tsx";
import Analysis from "./pages/Analysis.tsx";
import History from "./pages/History.tsx";
import Profile from "./pages/Profile.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { HabitsProvider } from "./context/HabitsContext.tsx";

function App() {

    return (
        <HabitsProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </HabitsProvider>
    )
}

export default App
