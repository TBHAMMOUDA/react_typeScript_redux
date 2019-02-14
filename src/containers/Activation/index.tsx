import * as React from 'react'
import UserService from '../../services/user'

import './style.scss'

import Button from '../../components/Button'
import Entry from '../../components/Entry'

interface IState {
    activationFailed: boolean
    key: string
}

interface IPropos {
    history: any
}

export default class Activation extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            activationFailed: false,
            key: ''
        }
    }

    keyChanged(event) { this.setState({ key: event.target.value }) }

    async activate() {
        try {
            let result = await UserService.Activate(localStorage.getItem('rushtera_user_email'), this.state.key)
            this.props.history.push('/')
        } catch (ex) {
            this.setState({ activationFailed: true })
        }
    }

    render() {
        return <div className='auth' >
            <main className='forgot-password'>
                <div className='vertical-middle'>
                    <div className='fixed-container'>
                        <h2>Activate your account</h2>

                        <p className='text-gray'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatem ullam itaque laborum qui eveniet.
                        </p>

                        {this.state.activationFailed && <p className='text-danger'>
                            Account activation failed, please check your email for key or contact us
                        </p>}


                        <Entry label='Activation key' onChange={this.keyChanged.bind(this)} placeholder='Key you received via email' type='password' size='large' />

                        <div className='text-center'>
                            <Button content='Activate my account' action={this.activate.bind(this)} theme='primary' size='large' />
                        </div>
                    </div>
                </div>
            </main>
        </div >
    }
}