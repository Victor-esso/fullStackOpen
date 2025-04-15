import { combineReducers } from "redux";
import anecdotesReducer from './anecdoteReducer'
import filterReducer from './filter'
import notificationsReducer from './notificationReducer'
const root = combineReducers({
    anecdotes : anecdotesReducer ,
    filter : filterReducer,
    notifications : notificationsReducer
})

export default root