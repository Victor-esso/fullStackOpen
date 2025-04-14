const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const CREATE_ANECDOTE = 'CREATE_ANECDOTE'
const LIKE_ANECDOTE = 'LIKE_ANECDOTE'

export const createAnecdote = (anecdote) => {
  return {
    type : CREATE_ANECDOTE,
    payload : asObject(anecdote)
  }
}

export const likeAnecdote = id => ({ type : LIKE_ANECDOTE , payload: id})

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  if(action.type === CREATE_ANECDOTE){
    return [...state , action.payload]
  }

  if(action.type === LIKE_ANECDOTE){
    return state.map(a => a.id === action.payload ? { ...a , votes:a.votes+1 } : a )
  }

  return state
}

export default reducer