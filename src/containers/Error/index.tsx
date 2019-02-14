import * as React from 'react'

import './style.scss'
import Icon from '../../components/Icon';

interface IState { }
interface IProps {
    details: any
}

export default class Error extends React.Component<IProps, IState> {
    render() {
        const { details } = this.props

        return <div className='error-component'>
            <div className='vertical-middle'>
                <h1 className='mb-5'>
                    <Icon name='tired' />
                </h1>

                <h2>Oops, there's an error</h2>
                <h5>Please contact the technical team</h5>

                <div className='mt-4'>
                    <div><kbd>{details.name + ', ' + details.message}</kbd></div>
                    <div className='mt-3'><kbd>{details.stack.substr(0, details.stack.indexOf('tsx') + 3)}</kbd></div>
                </div>
            </div>
        </div>
    }
}