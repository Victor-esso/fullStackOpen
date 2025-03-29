import React, { useState } from 'react'
import loginService from '../services/login'
import blogServices from '../services/blogs'

const Login = ( { setUser , setErrorMessage , setShowLogin , fetchBlogs}) => {
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({ username , password })
            
            window.localStorage.setItem('loggedInUser' , JSON.stringify(user))
            setUser(user)
            blogServices.setToken(user.token)
            setUsername('')
            setPassword('')
            setShowLogin(false)
            fetchBlogs()

        }catch (e) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
        }
    }

  return (
    <div>
        <h1>Log in to application</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label>Username : </label>
                <input 
                    type="text"
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <br/>
            <div>
                <label>Password : </label>
                <input 
                    type="password"
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>

            <br/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login