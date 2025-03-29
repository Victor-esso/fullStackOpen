import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {

  console.log('getting all', axiosHeader())
  const response = await axios.get(baseUrl, axiosHeader())
  return response.data
}

const create = async newObject => {
  const config = {
    headers : { Authorization : token },
  }
  const response = await axios.post(baseUrl, newObject , config)
  return response.data
}

const likePost = async postID => {
  const config = {
    headers : { Authorization : token },
  }
  const response = await axios.put(`${baseUrl}/${postID}/like`, {} , config)
  return response.data
}

const unLikePost = async postID => {
  const config = {
    headers : { Authorization : token },
  }
  const response = await axios.put(`${baseUrl}/${postID}/unlike`, {} , config)
  return response.data
}

const deletePost = async postID =>{
 
  const response = await axios.delete(`${baseUrl}/${postID}`, axiosHeader())
  return response.data
}

const axiosHeader = () => {
  return {
    headers : { Authorization : token },
  }
}

export default { getAll , setToken , create , likePost , unLikePost , deletePost}