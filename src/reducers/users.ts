const reducer = (state = [], action) => {
    switch (action.type) {
        case 'RETRIEVE_USER':
            return action.data
        case 'UPDATE_USER':
            return action.data

        default: return state
    }
}

export default reducer