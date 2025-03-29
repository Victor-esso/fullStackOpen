import React, { useState } from 'react'
import blogService from '../services/blogs'
const CreateBlog = ( { setSuccessMessage , setErrorMessage , setBlogs , closePostForm}) => {

    const [author , setAuthor] = useState('')
    const [title , setTitle] = useState('')
    const [url , setUrl] = useState('')
    const handleSubmit =  async (e) =>{
        e.preventDefault()
        try{
            const post = await blogService.create({author , title, url})
            setBlogs((blogs) => {
                return [...blogs,post]
            })
            
            setSuccessMessage(`New blog ${post.title} by ${post.author}`)

            setAuthor('')
            setTitle('')
            setUrl('')
            closePostForm()
            
        }catch (e){
            setErrorMessage('Error creating post')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }


  return (
    <div>
        <h2>Create New</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title : </label>
                <input 
                    type="text"
                    value={title}
                    name='title'
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <br/>
            <div>
                <label>Author : </label>
                <input 
                    type="text"
                    value={author}
                    name='author'
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <br/>
            <div>
                <label>url : </label>
                <input 
                    type="text"
                    value={url}
                    name='url'
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <br/>
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default CreateBlog