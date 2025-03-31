import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user , setUser] = useState(null)
	const [errorMessage , setErrorMessage] = useState(null)
	const [successMessage , setSuccessMessage] = useState(null)
	const [ showLogin , setShowLogin ] = useState(false)
	const postFormRef =  useRef()



	const fetchBlogs = () => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedInUser')
		if(loggedUserJson){
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			blogService.setToken(user.token)
			fetchBlogs()
		}
	}, [])

	useEffect(() => {
		if(successMessage !== null){
			setTimeout(() => {
				setSuccessMessage(null)
			},4000)
		}
	}, [successMessage])

	if(showLogin){
		return (
			<>
				{errorMessage &&
					<div style={{ width: 'max-content' , backgroundColor: 'red' , color: 'white' , padding: '.25rem 1rem' , borderRadius : '.4rem' }}>
						{errorMessage}
					</div>
				}
				<Login setUser={setUser} setErrorMessage={setErrorMessage} setShowLogin={setShowLogin} fetchBlogs={fetchBlogs} />

				<button onClick={() => setShowLogin(false)}>Cancel</button>
			</>
		)
	}

	const logout = () => {
		setUser(null)
		blogService.setToken(null)
		window.localStorage.removeItem('loggedInUser')
	}

	const showLoginForm = () => {
		setShowLogin(true)
		logout()
	}

	const closePostForm = () => {
		postFormRef.current.toggleVisibility()
	}

	let sortedBlogs = blogs.sort( (a , b) => {
		return b.likes - a.likes
	})



	return (
		<div>
			{errorMessage &&
					<div style={{ width: 'max-content' , backgroundColor: 'red' , color: 'white' , padding: '.25rem 1rem' , borderRadius : '.4rem' }}>
						{errorMessage}
					</div>
			}
			{successMessage &&
					<div style={{ width: 'max-content' , backgroundColor: 'green' , color: 'white' , padding: '.25rem 1rem' , borderRadius : '.4rem' }}>
						{successMessage}
					</div>
			}
			<h2>blogs</h2>
			{ user?.name
				?
				<p>{`${user?.name} is logged in`} <button onClick={logout}>Logout</button></p>
				:
				<button onClick={showLoginForm}>Login</button>
			}
			<Togglable toggleLabel="New Post" ref={postFormRef}>
				<CreateBlog setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}  setBlogs={setBlogs} closePostForm={closePostForm} />
			</Togglable>
			{sortedBlogs.map(blog =>
				<Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
			)}
		</div>
	)
}

export default App