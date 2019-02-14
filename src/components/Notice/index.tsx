import * as React from 'react'

import './style.scss'
import Icon from '../Icon'

interface IState {
    mounted: boolean
}

interface IPropos {
    message: string
    theme: string
}

export default class Notice extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            mounted: true
        }
    }

    unmount() { this.setState({ mounted: false }) }

    render() {
        if (this.state.mounted) {
            return <div className={['notice', this.props.theme].join(' ')}>
                {this.props.message}

                <div className='close-icon' onClick={this.unmount.bind(this)}>
                    <Icon name='times' color='primary' />
                </div>
            </div>
        } else return null
    }
}