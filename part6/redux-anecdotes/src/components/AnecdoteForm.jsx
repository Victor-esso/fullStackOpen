import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { newNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleCreate = (e) => {
      e.preventDefault()
      const anecdote = e.target.anecdote.value.trim()
      console.log(anecdote)
      if(anecdote === ''){
        return;
      }
      dispatch(createAnecdote(anecdote))
      dispatch(newNotification({
        message : `New Anecdote : ${anecdote}`,
        type : 'error'
      }))
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