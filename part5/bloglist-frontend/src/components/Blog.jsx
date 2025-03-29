import { useState } from "react"
import BlogServices from '../services/blogs'

const Blog = ({ blog , setBlogs}) => {
  const [ showAll , setShowAll ] = useState(false)

  // console.log(blog)
  const blogStyle = {
    padding: '10px 2px 10px 10px',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 20
  }

  const likePost = async () => {
    const response = await BlogServices.likePost(blog.id)
    setBlogs((blogs) => {
      const newBlogs = blogs.map(nBlog => {
        return blog.id === nBlog.id ? {...nBlog , likes : response.likes} : nBlog
      })

      return newBlogs
    })
  }
  const unlikePost = async () => {
    const response = await BlogServices.unLikePost(blog.id)
    setBlogs((blogs) => {
      const newBlogs = blogs.map(nBlog => {
        return blog.id === nBlog.id ? {...nBlog , likes : response.likes} : nBlog
      })

      return newBlogs
    })
  }

  const deletePost = async () => {
    const response = await BlogServices.deletePost(blog.id)
    console.log(response);
    // remove from list
    setBlogs((blogs) => blogs.filter(nBlog => nBlog.id !== blog.id))
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Hide' : 'Show'}</button></div>
       {showAll && 
        <>
          <a href={blog.url}>{blog.url}</a>
          <div>{`likes ${blog?.likes ? blog.likes : 0}`} <button onClick={() => likePost()}>Like</button> {(blog?.likes && parseInt(blog.likes) > 0) ? <button onClick={() => unlikePost()}>Unlike</button> : ''}</div>
          <div><i>- {blog.author}</i></div>
          {blog.owner && 
          <button onClick={() => deletePost()} style={{padding:'.2rem 1rem', backgroundColor : 'red' , border: 'none' , borderRadius : '.2rem' , color : 'white' , margin : '.3rem 0'}}>Remove</button>}
        </>
       }
    </div>  
  )
}

export default Blog