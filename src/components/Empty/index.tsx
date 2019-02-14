import * as React from 'react'

import './style.scss'
import Icon from '../Icon';

interface IState { }
interface IPropos {
    icon: string
    headline: string
    message: string
}

export default class Empty extends React.Component<IPropos, IState> {
    render() {
        return <div className='empty'>
            <div className='vertical-middle'>
                <Icon name={this.props.icon} color='primary' />
                <h1>{this.props.headline}</h1>
                <p>{this.props.message}</p>
            </div>
        </div>
    }
}