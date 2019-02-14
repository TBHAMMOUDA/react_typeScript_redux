import * as React from 'react'

import './style.scss'
import Icon from '../../Icon';

interface IState { }
interface IPropos {
    icon: string
    active?: boolean
    action?: any
}

export default class TabIcon extends React.Component<IPropos, IState> {
    render() {
        return <li onClick={this.props.action} className={['tab-item tab-icon', (this.props.active ? 'active-icon' : '')].join(' ')}>
            <Icon name={this.props.icon} />
        </li>
    }
}