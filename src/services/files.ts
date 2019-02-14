import Config from './config'
import Http from 'axios'

const token = localStorage.getItem('user_token')

const Get = async (path = '/') => {
    let response = await Http.post(Config.BASE_URL + '/listFiles?token=' + token, { path })
    return response.data
}

const CreateFolder = async (path) => {
    let response = await Http.post(Config.BASE_URL + '/createFolder?token=' + token, { newPath: path })
    return response.data
}

const DownloadSingleFile = async (path) => {
    window.open(Config.BASE_URL + '/Download?token=' + token + '&path=' + path, '_blank')
}

const Delete = async (path) => {
    let response = await Http.post(Config.BASE_URL + '/removeItems?token=' + token, { items: [path] })
    return response.data
}

const Rename = async (path, newName) => {
    let response = await Http.post(Config.BASE_URL + '/renameItem?token=' + token, { item: path, newItemPath: newName })
    return response.data
}

const Copy = async (item, newPath) => {
    let response = await Http.post(Config.BASE_URL + '/copyItems?token=' + token, { items: [item], newPath })
    return response.data
}

const Move = async (item, newPath) => {
    let response = await Http.post(Config.BASE_URL + '/moveItems?token=' + token, { items: [item], newPath })
    return response.data
}

const Download = async (path) => {
    let response = await Http.get(Config.BASE_URL + '/downloadItem?token=' + token + '&path=' + path)
    window.location.href = response.data
}

const MultipleDownload = async (path, filename) => {
    let response = await Http.post(Config.BASE_URL + '/multipleDownloadItems?token=' + token, {
        items: [path], toFilename: filename 
    })

    return response
}

const Tree = async () => {
    let response = await Http.post(Config.BASE_URL + '/getFilesTree?token=' + token, {
        path: '/'
    })
    return response
}

const CheckFile = async (username: string, path: string, filename: string, filesize: string) => {
    let response = await Http.get(Config.BASE_URL + `/checkfile?username=${username}&path=${path}&filename=${filename}&filesize=${filesize}`)
    return response
}

export default {
    Get, CreateFolder, DownloadSingleFile, Delete, Rename, Copy, Move, Download, MultipleDownload, Tree, CheckFile
}