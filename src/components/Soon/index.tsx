import * as React from 'react'

import './style.scss'
import Icon from '../Icon';

interface IState { }
interface IPropos { }

export default class Soon extends React.Component<IPropos, IState> {
    render() {
        return <div className='soon'>
            <div className='text-center'>
                <Icon name='hourglass-start' color='gray' />
                <h1>Coming soon!</h1>
                <p>We're still working on this feature.</p>
            </div>
        </div>
    }
}