import { Navigate } from "react-router-dom"
import Protected from "./components/Protected"

// * Importing pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Standings from "./pages/Standings"

// * importing protected pages
import Dashboard from "./pages/admin/Dashboard"
import Log from "./pages/admin/Log"

const routes = [
    { path : "/" , element : <Home />},
    { path : "/login" , element : <Login />},
    { path : "/profile" , element : <Profile />},
    { path : "/standings" , element : <Standings />},

    {
        element : <Protected />,
        path : "/admin",
        children : [
            { path : "" , element : <Dashboard />},
            { path : "dashboard" , element : <Dashboard />},
            { path : "log" , element : <Log />},
        ]
    },

    { path : "*" , element : <Navigate to="/" replace />}
]

export default routes