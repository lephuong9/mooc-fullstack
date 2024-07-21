import axios from "axios";

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const updateNumber = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default{ getAll, create, updateNumber }