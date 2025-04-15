import { useDispatch, useSelector } from "react-redux"
import { likeAnecdote } from "../reducers/anecdoteReducer"
import { newNotification } from "../reducers/notificationReducer"
const AnecdoteList = () => {
  const filter = useSelector(s => s.filter).trim()
  const anecdotes = useSelector(state => filter ? state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())): state.anecdotes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(likeAnecdote(anecdote.id))
        dispatch(newNotification({message : `You just liked :- ${anecdote.content}`}))
    }

 
    const sorted = [...anecdotes].sort( ( a , b ) => b.votes - a.votes)
    

  return (
    <>
    {sorted.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList