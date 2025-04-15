import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = (e) => {
      e.preventDefault()
      const anecdote = e.target.anecdote.value.trim()
      if(anecdote === ''){
        return;
      }
      dispatch(newAnecdote(anecdote))
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm