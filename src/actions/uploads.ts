const Retrieve = (data) => {
    return {
        type: 'RETRIEVE_UPLOADS',
        data
    }
}

const Create = (data) => {
    return {
        type: 'CREATE_UPLOAD',
        data: data
    }
}

const Update = (data) => {
    return {
        type: 'UPDATE_UPLOAD',
        data: data
    }
}

const Delete = (data) => {
    return {
        type: 'DELETE_UPLOAD',
        data: data
    }
}

export default {
    Retrieve, Create, Update, Delete
}