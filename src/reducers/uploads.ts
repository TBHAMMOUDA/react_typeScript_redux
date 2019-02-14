const reducer = (state = [], action) => {
    switch (action.type) {
        case 'RETRIEVE_UPLOADS':
            return [...action.data]
        case 'CREATE_UPLOAD':
            return [...state, action.data]
        case 'UPDATE_UPLOAD':
            return state.map((item) => item.path === action.data.path && item.filename === action.data.filename ? Object.assign(item, action.data) : item)
        case 'DELETE_UPLOAD':
            return state.filter((item) => item.path !== action.data.path && item.filename !== action.data.filename)

        default: return state
    }
}

export default reducer