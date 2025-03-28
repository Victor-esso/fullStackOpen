import axios from "axios";
// const baseUrl = 'http://localhost:3030/api/contacts'
// const baseUrl = 'https://phonebook-server-test.onrender.com/api/contacts/'
const baseUrl = '/api/contacts'

const all = () => {
    const re = axios.get(baseUrl);
    return re.then(r => r.data);
}

const create = newContact => {
    const re = axios.post(baseUrl,newContact);
    return re.then(r => r.data);
}

const update = (id, newContact) => {
    const re = axios.put(`${baseUrl}/${id}`, newContact);
    return re.then(r => r.data);
}

const del = id => {
    const re = axios.delete(`${baseUrl}/${id}`);
    return re.then(r => r.data);
}

const clearAll = async () => {
    const allContacts = await axios.get(baseUrl).then(r => r.data);
    const deletePromises = allContacts.map(contact =>
        axios.delete(`${baseUrl}/${contact.id}`)
    );
    return Promise.all(deletePromises).then(() => allContacts);
};



export default { all , create ,  update , del, clearAll }