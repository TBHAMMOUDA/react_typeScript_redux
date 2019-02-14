import { combineReducers } from 'redux'

import projects from './projects'
import uploads from './uploads'
import accounts from './users'
import files from './files'
import links from './links'

const reducers = combineReducers({
    accounts, projects, files, links, uploads
})

export = reducers