const Retrieve = (data) => {
    return {
        type: 'RETRIEVE_FILES',
        data
    }
}

const Create = (data) => {
    return {
        type: 'CREATE_FILE',
        data: data
    }
}

const Rename = (oldName, newName) => {
    return {
        type: 'RENAME_FILE',
        data: {
            oldName,
            newName
        }
    }
}

const Delete = (id) => {
    return {
        type: 'DELETE_FILE',
        data: id
    }
}

export default {
    Retrieve, Create, Rename, Delete
}