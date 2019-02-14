import * as React from 'react'

import './style.scss'

interface IState {
    loading: boolean
}
interface IPropos {
    dataDismiss?: string
    content: string
    theme: string
    action: any
    size?: string
    disabled?: boolean
}

export default class Button extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    async handleClick() {
        try {
            this.setState({ loading: true })
            await this.props.action()
        } finally {
            this.setState({ loading: false })
        }
    }

    render() {
        return <button data-dismiss={this.props.dataDismiss} className={['button', (this.state.loading ? 'm-progress' : ''), this.props.theme, this.props.size, (this.props.disabled ? 'disabled' : '')].join(' ')} onClick={this.handleClick.bind(this)} disabled={this.props.disabled}>{this.props.content}</button>
    }
}