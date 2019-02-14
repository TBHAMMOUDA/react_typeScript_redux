const Retrieve = (data) => {
    return {
        type: 'RETRIEVE_LINKS',
        data
    }
}

const Create = (data) => {
    return {
        type: 'CREATE_LINK',
        data: data
    }
}

const Update = (data) => {
    return {
        type: 'UPDATE_LINK',
        data: data
    }
}

const Delete = (id) => {
    return {
        type: 'DELETE_LINK',
        data: id
    }
}

export default {
    Retrieve, Create, Update, Delete
}