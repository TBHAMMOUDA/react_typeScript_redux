import * as React from 'react'
import { Link } from 'react-router-dom'

import UserService from '../../services/user'

import './style.scss'

import Button from '../../components/Button'
import Entry from '../../components/Entry'

interface IState {
    passwordInvalid: boolean
    passwordNotMatch: boolean
    registrationFailed: boolean
    email: string
    password: string
    passwordConfirmation: string
    coverPhoto: string
}

interface IPropos {
    history: any
}

export default class Register extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            passwordInvalid: false,
            passwordNotMatch: false,
            registrationFailed: false,
            email: '',
            password: '',
            passwordConfirmation: '',
            coverPhoto: this.random()
        }
    }

    emailChanged(event) { this.setState({ email: event.target.value }) }
    passwordChanged(event) { this.setState({ password: event.target.value }) }
    passwordConfirmationChanged(event) { this.setState({ passwordConfirmation: event.target.value }) }

    checkPassword(event) { this.setState({ passwordInvalid: event.target.value.length < 8 }) }
    checkPasswordConfirmation(event) { this.setState({ passwordNotMatch: this.state.password !== event.target.value }) }

    random() {
        const covers = [
            '/assets/images/cover-1.jpg',
            '/assets/images/cover-2.jpg',
            '/assets/images/cover-3.jpg'
        ]

        return covers[Math.random() * covers.length >> 0]
    }

    async register() {
        try {
            let result = await UserService.Register(this.state.email, this.state.password, this.state.passwordConfirmation)

            if ('token' in result) {
                localStorage.setItem('user_email', this.state.email)
                localStorage.setItem('user_token', result.token)
                window.location.reload()
            } else {
                this.setState({ registrationFailed: true })
            }
        } catch (exception) {
            this.setState({ registrationFailed: true })
        }
    }

    render() {
        return <div className='auth'>
            <div className='cover'>
                <img className='cover-img' src={this.state.coverPhoto} />
            </div>

            <main>
                <div className='vertical-middle'>
                    <div className='fixed-container'>
                        <h1>Welcome to <span className='text-primary'>BhRx File Manager</span></h1>

                        <p className='text-gray'>
                            Limitless file sharing and streaming for production, post-production, and distribution. Fast, simple, secure.
                        </p>

                        {this.state.registrationFailed && <p className='text-danger'>
                            Oops, the email address is already used!
                        </p>}

                        {this.state.passwordNotMatch && <p className='text-danger'>
                            Oops, password confirmation does not match!
                        </p>}

                        {this.state.passwordInvalid && <p className='text-danger'>
                            Oops, your password is not long enough!
                        </p>}

                        <Entry label='Email Address' onChange={this.emailChanged.bind(this)} placeholder='Enter email' type='email' size='large' />
                        <Entry label='Password' onChange={this.passwordChanged.bind(this)} onBlur={this.checkPassword.bind(this)} placeholder='Must have at least 8 characters' type='password' size='large' />
                        <Entry label='Confirm password' onChange={this.passwordConfirmationChanged.bind(this)} onBlur={this.checkPasswordConfirmation.bind(this)} placeholder='Password fields must match' type='password' size='large' />

                        <div className='text-center'>
                            <Button content='Register' action={this.register.bind(this)} theme='primary' size='large' disabled={!(!this.state.passwordInvalid && !this.state.passwordNotMatch && this.state.password.length > 0 && this.state.email.length > 0 && this.state.passwordConfirmation.length > 0 && this.state.password === this.state.passwordConfirmation)} />

                            <p className='text-gray'>
                                Already registered? <Link to='/login'>Login now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    }
}