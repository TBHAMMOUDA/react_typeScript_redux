import * as React from 'react'

import './style.scss'
import Icon from '../Icon';

interface IState { }
interface IPropos {
    icon?: string
}

export default class Dropdown extends React.Component<IPropos, IState> {
    render() {
        return <div className='dropdown'>
            <div data-toggle='dropdown' className='dropdown-icon'>
                <Icon name={this.props.icon || 'ellipsis-h'} color='gray' />
            </div>

            <div className='dropdown-menu dropdown-menu-right'>
                {this.props.children}
            </div>
        </div>
    }
}