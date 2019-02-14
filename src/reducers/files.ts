const reducer = (state = [], action) => {
    switch (action.type) {
        case 'RETRIEVE_FILES':
            return [...action.data]
        case 'CREATE_FILE':
            return [...state, action.data]
        case 'RENAME_FILE':
            return state.map(item => item.name === action.data.oldName ? Object.assign(item, { name: action.data.newName }) : item)
        case 'DELETE_FILE':
            return state.filter(item => item.name !== action.data)

        default: return state
    }
}

export default reducer