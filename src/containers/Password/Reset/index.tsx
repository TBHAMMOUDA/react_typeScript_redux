import * as React from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../../services/user'

import './style.scss'

import Button from '../../../components/Button'
import Entry from '../../../components/Entry'

interface IState {
    passwordNotMatch: boolean
    passwordInvalid: boolean
    resetFailed: boolean
    confirmPassword: string
    password: string
    coverPhoto: string
}

interface IPropos {
    history: any
    match: any
}

export default class ResetPassword extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            passwordNotMatch: false,
            passwordInvalid: false,
            resetFailed: false,
            confirmPassword: '',
            password: '',
            coverPhoto: this.random()
        }
    }

    passwordChanged(event) { this.setState({ password: event.target.value }) }
    confirmPasswordChanged(event) { this.setState({ confirmPassword: event.target.value }) }

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

    async resetPassword() {
        try {
            await UserService.ResetPassword(this.state.password, this.state.confirmPassword, this.props.match.params.id)
            this.props.history.push('/login')
        } catch (exception) {
            this.setState({ resetFailed: true })
        }
    }

    render() {
        return <div className='auth'>
            <div className='cover'>
                <img className='cover-img' src={this.state.coverPhoto} />
            </div>

            <main className='forgot-password'>
                <div className='vertical-middle'>
                    <div className='fixed-container'>
                        <h2>Please enter your new password.</h2>

                        <p className='text-gray'>
                            Limitless file sharing and streaming for production, post-production, and distribution. Fast, simple, secure.
                        </p>

                        {this.state.resetFailed && <p className='text-danger p-0'>
                            Oops, it seems like reset link is expired.
                        </p>}

                        {this.state.passwordNotMatch && <p className='text-danger p-0'>
                            Oops, password confirmation does not match!
                        </p>}

                        {this.state.passwordInvalid && <p className='text-danger p-0'>
                            Oops, your password is not long enough!
                        </p>}


                        <Entry label='New password' onChange={this.passwordChanged.bind(this)} onBlur={this.checkPassword.bind(this)} placeholder='Must have at least 8 characters' type='password' size='large' />
                        <Entry label='Confirm password' onChange={this.confirmPasswordChanged.bind(this)} onBlur={this.checkPasswordConfirmation.bind(this)} placeholder='Password fields must match' type='password' size='large' />

                        <div className='text-center'>
                            <Button content='Set new password' action={this.resetPassword.bind(this)} theme='primary' size='large' disabled={!(!this.state.passwordInvalid && !this.state.passwordNotMatch && this.state.password.length > 0 && this.state.confirmPassword.length > 0 && this.state.password === this.state.confirmPassword)} />
                        </div>
                    </div>
                </div>
            </main>
        </div >
    }
}