import * as React from 'react'

import './style.scss'

interface IStates { }

interface IProps {
    label: string
    onChange?: any
    size?: string
}

export default class Select extends React.Component<IProps, IStates> {
    render() {
        return <div className='form-group select'>
            <label>{this.props.label}</label>
            <select onChange={this.props.onChange} className={['form-control', this.props.size].join(' ')}>
                {this.props.children}
            </select>
        </div>
    }
}