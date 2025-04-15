import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from './reducers/root'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer : rootReducer
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)