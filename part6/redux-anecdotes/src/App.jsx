import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/filter'
import Notifications from './components/Notifications'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdotesServices from './services/anecdotes' 
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
      <Notifications />
    </div>
  )
}

export default App