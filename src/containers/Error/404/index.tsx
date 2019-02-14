import * as React from 'react'

import './style.scss'
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';

interface IState { }
interface IProps {
    history: any
}

export default class Error404 extends React.Component<IProps, IState> {
    return() {
        this.props.history.push('/')
    }

    render() {
        return <div className='error-component error-404'>
            <div className='vertical-middle'>
                <h1 className='mb-5'>
                    <Icon name='grin-beam-sweat' />
                </h1>

                <h2>Apparently we're lost!</h2>
                <h5>The page you want does not exist</h5>

                <div className='mt-5'>
                    <Button content='Return to main page' theme='outline' size='large' action={this.return.bind(this)} />
                </div>
            </div>
        </div>
    }
}