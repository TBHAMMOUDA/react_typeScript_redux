const Retrieve = (data) => {
    return {
        type: 'RETRIEVE_USER',
        data
    }
}

const Update = (data) => {
    return {
        type: 'UPDATE_USER',
        data: data
    }
}

export default {
    Retrieve, Update
}