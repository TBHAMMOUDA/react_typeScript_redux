const Retrieve = (data) => {
    return {
        type: 'RETRIEVE_PROJECTS',
        data
    }
}

const Create = (data) => {
    return {
        type: 'CREATE_PROJECT',
        data: data
    }
}

const Update = (data) => {
    return {
        type: 'UPDATE_PROJECT',
        data: data
    }
}

const Delete = (name) => {
    return {
        type: 'DELETE_PROJECT',
        data: name
    }
}

export default {
    Retrieve, Create, Update, Delete
}