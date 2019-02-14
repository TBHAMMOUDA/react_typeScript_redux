import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos {
    center?: boolean
}

export default class Tab extends React.Component<IPropos, IState> {
    render() {
        return <div className={['tab', (this.props.center && 'center')].join(' ')}>
            <ul>
                {this.props.children}
                <li></li>
            </ul>
        </div>
    }
}