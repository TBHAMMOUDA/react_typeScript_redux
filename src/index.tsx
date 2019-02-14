import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Reducers from './reducers'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import App from './containers/App'

const root = document.getElementById('app')

// @ts-ignore
const store = createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// const store = createStore(Reducers)

const render = App => ReactDOM.render(
    <AppContainer>
        <Provider store={store} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </AppContainer>, root
)

render(App)

store.subscribe(() => render(App))

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        let App = require('./containers/App').default
        render(App)
    })
}