import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user , setUser] = useState(null)
  const [errorMessage , setErrorMessage] = useState(null)
  const [successMessage , setSuccessMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if(successMessage !== null){
      setTimeout(() => {
        setSuccessMessage(null)
      },4000)
    }
  }, [successMessage])

  if(!user){
    return (
      <>
        {errorMessage && 
          <div style={{width: 'max-content' , backgroundColor: 'red' , color: 'white' , padding: '.25rem 1rem' , borderRadius : '.4rem'}}>
            {errorMessage}
          </div>
        }
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      </>
    )
  }

  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
  }

  return (
    <div>
      {errorMessage && 
          <div style={{width: 'max-content' , backgroundColor: 'red' , color: 'white' , padding: '.25rem 1rem' , borderRadius : '.4rem'}}>
            {errorMessage}
          </div>
      }
      {successMessage && 
          <div style={{width: 'max-content' , backgroundColor: 'green' , color: 'white' , padding: '.25rem 1rem' , borderRadius : '.4rem'}}>
            {successMessage}
          </div>
      }
      <h2>blogs</h2>
      <p>{`${user.name} is logged in`} <button onClick={logout}>Logout</button></p>
      <CreateBlog setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}  setBlogs={setBlogs} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App