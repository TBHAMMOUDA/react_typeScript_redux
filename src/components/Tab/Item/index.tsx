import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos {
    content: string
    active?: boolean
    action?: any
}

export default class TabItem extends React.Component<IPropos, IState> {
    render() {
        return <li onClick={this.props.action} className={['tab-item', (this.props.active ? 'active' : '')].join(' ')}>{this.props.content}</li>
    }
}