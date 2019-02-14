import * as React from 'react'

import './style.scss'
import Icon from '../Icon'

declare var $

interface IState {
    mounted: boolean
}

interface IPropos {
    message: string
}

export default class NotificationComponent extends React.Component<IPropos, IState> {
    notification: any

    constructor(props) {
        super(props)

        this.state = {
            mounted: true
        }

        this.notification = React.createRef()
    }

    componentDidMount() {
        setTimeout(() => {
            this.unmount()
        }, 3000);
    }

    unmount() { this.setState({ mounted: false }) }

    render() {
        return <div ref={this.notification} className={['notification', 'animated', this.state.mounted ? 'fadeInUp' : 'fadeOut'].join(' ')}>
            {this.props.message}

            <div className='close-icon' onClick={this.unmount.bind(this)}>
                <Icon name='times' color='primary' />
            </div>
        </div>
    }
}