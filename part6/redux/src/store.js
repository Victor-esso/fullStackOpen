import { createStore } from "redux";

const initialState = {
    counter : {
        good : 0,
        bad : 0,
        ok : 0
    }
}

// create actions
const ADD_GOOD = 'ADD_GOOD'
const ADD_BAD = 'ADD_BAD'
const ADD_OK = 'ADD_OK'
const RESETTING = 'RESETTING'
const RESET = 'RESET'




const reducer = (state = initialState , action) => {
    switch (action.type) {
        case ADD_GOOD:
            return { ...state, counter : {...state.counter , good : state.counter.good + 1}}
        case ADD_BAD:
            return { ...state, counter : {...state.counter , bad : state.counter.bad + 1}}
        case ADD_OK:
            return { ...state, counter : {...state.counter , ok : state.counter.ok + 1}}
        case RESET:
            return initialState
        case RESETTING:
            return {...store , counter : {good : 'resetting ...' , bad : 'resetting ...' , ok: 'resetting ...'}}
        default:
            return state
    }
}

const store = createStore(reducer)
// actions 
export const isGood = () => ({ type : ADD_GOOD})
export const isBad = () => ({ type : ADD_BAD})
export const isOk = () => ({ type : ADD_OK})
export const reset = (duration = 5000) => {
    store.dispatch({ type : RESETTING})
    setTimeout(() => {
        store.dispatch({ type : RESET})
    },duration)
}

export default store