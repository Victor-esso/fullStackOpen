import { combineReducers } from "redux";
import anecdotesReducer from './anecdoteReducer'
import filterReducer from './filter'
import notificationsReducer from './notificationReducer'
import { configureStore } from "@reduxjs/toolkit";
const root = combineReducers({
    anecdotes : anecdotesReducer ,
    filter : filterReducer,
    notifications : notificationsReducer
})

const store = configureStore({
    reducer : root
  })

export default store