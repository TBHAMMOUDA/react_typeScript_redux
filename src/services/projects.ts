import Config from './config'
import Http from 'axios'

const token = localStorage.getItem('user_token')

const Get = async () => {
    let response = await Http.post(Config.BASE_URL + '/listFiles?token=' + token, { path: '/' })
    return response.data
}

const Create = async (name) => {
    let response = await Http.post(Config.BASE_URL + '/createFolder?token=' + token, { newPath: '/' + name })
    return response.data
}

const Delete = async (name) => {
    let response = await Http.post(Config.BASE_URL + '/removeItems?token=' + token, { items: ['/' + name] })
    return response.data
}

export default {
    Get, Create, Delete
}