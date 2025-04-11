import { createStore } from "redux";

const initialState = {
    good : 0,
    bad : 0,
    ok : 0
}

// create actions
const ADD_GOOD = 'ADD_GOOD'
const ADD_BAD = 'ADD_BAD'
const ADD_OK = 'ADD_OK'
const RESET = 'RESET'


// actions 
export const isGood = () => ({ type : ADD_GOOD})
export const isBad = () => ({ type : ADD_BAD})
export const isOk = () => ({ type : ADD_OK})
export const reset = () => ({ type : RESET})

const reducer = (state = initialState , action) => {
    switch (action.type) {
        case ADD_GOOD:
            console.log({ ...state, good : state.good + 1})
            return { ...state, good : state.good + 1}
        case ADD_BAD:
            return { ...state, bad : state.bad + 1}
        case ADD_OK:
            return { ...state, ok : state.ok + 1}
        case RESET:
            return initialState
        default:
            return state
    }
}

export default createStore(reducer)