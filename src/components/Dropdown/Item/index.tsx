import * as React from 'react'

import './style.scss'
import Icon from '../../Icon';

interface IState { }
interface IPropos {
    action?: any
    content: string
    disabled?: boolean
}

export default class DropdownItem extends React.Component<IPropos, IState> {
    render() {
        return <button className='dropdown-item' onClick={this.props.action} {...(this.props.disabled && { disabled: true })}>{this.props.content}</button>
    }
}