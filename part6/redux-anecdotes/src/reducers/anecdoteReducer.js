import { createSlice } from "@reduxjs/toolkit"
import anecdotesServices from '../services/anecdotes'
import { newNotification } from "./notificationReducer"

const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState : [],
  reducers : {
    createAnecdote ( state , action) {
      return [...state , action.payload]
    } ,
    likeAnecdote ( state , action) {
      return state.map(a => a.id === action.payload ? { ...a , votes:a.votes+1 } : a )
    } ,
    appendNote (state , action ) {
      return state.push(action.payload)
    },
    setAnecdotes ( state , action ){
      return action.payload
    }
    
  }
})

export const { createAnecdote , likeAnecdote , appendNote , setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => async dispatch => {
  try{
    const anecdotes = await anecdotesServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }catch(e){
    console.log(e)
  }
}

export const newAnecdote = content => async dispatch => {
  const res =  await anecdotesServices.createNew(content)
  dispatch(createAnecdote(res))
  dispatch(newNotification({
    message : `New Anecdote : ${res.content}`,
    type : 'error'
  }))

}

export default anecdoteSlice.reducer