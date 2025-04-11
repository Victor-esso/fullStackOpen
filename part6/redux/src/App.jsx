import { BrowserRouter as Router , useRoutes } from "react-router-dom"
import routes from "./routes"
import { Provider } from "react-redux"
import store from "./store"


const AppRoutes = () => {
  return useRoutes(routes)
}

function App() {

  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  )
}

export default App
