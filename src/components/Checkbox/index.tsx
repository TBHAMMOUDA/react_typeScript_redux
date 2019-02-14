import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos {
    content: string
}

export default class Checkbox extends React.Component<IPropos, IState> {

    render() {
        return <label className='control control--checkbox'>
            {this.props.content}
            <input type='checkbox' />
            <div className='control__indicator'></div>
        </label>
    }
}