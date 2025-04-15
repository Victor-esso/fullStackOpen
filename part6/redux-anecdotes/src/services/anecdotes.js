import axios from "axios"

const API = axios.create({
    baseURL : 'http://localhost:4000/anecdotes',
    // withCredentials : true
})

const getAll = async () => {
    const res = await API.get()
    return res.data
}

const createNew = async (content) => {
    const object = { content , votes : 0}
    const res = await API.post('/', object)
    return res.data
}


export default { getAll , createNew}