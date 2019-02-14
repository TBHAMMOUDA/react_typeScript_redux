import * as React from 'react'

import './style.scss'

interface IStates { }

interface IProps {
    value: string
    content: string
    selected?: boolean
}

export default class SelectItem extends React.Component<IProps, IStates> {
    render() {
        /* selected={this.props.selected ? true : false} */
        return <option value={this.props.value} selected={this.props.selected ? true : false}>{this.props.content}</option>
    }
}