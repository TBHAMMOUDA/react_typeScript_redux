const reducer = (state = [], action) => {
    switch (action.type) {
        case 'RETRIEVE_PROJECTS':
            return [...action.data]
        case 'CREATE_PROJECT':
            return [action.data, ...state]
        case 'RENAME_PROJECT':
            return state.map((item) => item.name === action.data.name ? Object.assign(item, action.data) : item)
        case 'DELETE_PROJECT':
            return state.filter((item) => item.name !== action.data)

        default: return state
    }
}

export default reducer