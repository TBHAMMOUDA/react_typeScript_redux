import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos {
    id?: string
    settings?: boolean
}

export default class View extends React.Component<IPropos, IState> {
    render() {
        return <div id={this.props.id} className={['view', 'container-fluid', (this.props.settings && 'settings')].join(' ')}>
            <div className='card-deck'>
                {this.props.children}
            </div>
        </div>
    }
}