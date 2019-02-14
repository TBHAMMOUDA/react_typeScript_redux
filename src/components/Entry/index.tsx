import * as React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

interface IStates { }
interface IProps {
    label: string
    placeholder?: string
    type: string
    linkContent?: string
    linkTo?: string
    value?: string
    onChange?: any
    onBlur?: any
    size?: string
    isInvalid?: boolean
    invalidMessage?: string
}

export default class Entry extends React.Component<IProps, IStates> {
    public static defaultProps: Partial<IProps> = {
        linkTo: ''
    }

    constructor(props) {
        super(props)
    }

    render() {
        return <div className='form-group entry'>
            <label>{this.props.label}</label>
            <input onBlur={this.props.onBlur} onChange={this.props.onChange} className={['form-control', this.props.size, this.props.isInvalid ? 'invalid' : ''].join(' ')} type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} />
            {(this.props.linkContent && this.props.linkContent.length > 0) ? <Link className='forgot-password' to={this.props.linkTo}>{this.props.linkContent}</Link> : null}
            {this.props.isInvalid && <p className='entry-invalid'>{this.props.invalidMessage}</p>}
        </div>
    }
}