const reducer = (state = [], action) => {
    switch (action.type) {
        case 'RETRIEVE_LINKS':
            return [...action.data]
        case 'CREATE_LINK':
            return [...state, action.data]
        case 'UPDATE_LINK':
            return state.map((item) => item._id === action.data._id ? Object.assign(item, action.data) : item)
        case 'DELETE_LINK':
            return state.filter((item) => item._id !== action.data)

        default: return state
    }
}

export default reducer