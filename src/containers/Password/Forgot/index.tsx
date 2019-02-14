import * as React from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../../services/user'

import './style.scss'

import Button from '../../../components/Button'
import Entry from '../../../components/Entry'

interface IState {
    resetFailed: boolean
    resetSuccess: boolean
    email: string
    coverPhoto: string
}

interface IPropos { }

export default class ForgotPassword extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            resetFailed: false,
            resetSuccess: false,
            email: '',
            coverPhoto: this.random()
        }
    }

    emailChanged(event) { this.setState({ email: event.target.value }) }

    random() {
        const covers = [
            '/assets/images/cover-1.jpg',
            '/assets/images/cover-2.jpg',
            '/assets/images/cover-3.jpg'
        ]

        return covers[Math.random() * covers.length >> 0]
    }

    async forgotPassword() {
        try {
            let result = await UserService.ForgotPassword(this.state.email)
            this.setState({ resetSuccess: true, resetFailed: false })
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
                        <h2 className='pb-4'>Forgot your password?</h2>

                        {this.state.resetFailed && <p className='text-danger p-0'>
                            Sorry, we didn't recognize this email. Please double-check and try again.
                        </p>}

                        {this.state.resetSuccess && <>
                            <p className='p-0'>
                                An email was sent to your inbox with further instructions on how to reset your password.
                            </p>

                            <p className='text-gray'>
                                Back to <Link to='/login'>sign in</Link>
                            </p>
                        </>}

                        {!this.state.resetSuccess && <>
                            <p className='mb-0 p-0'>
                                We will send a recovery link to
                            </p>

                            <Entry label='' onChange={this.emailChanged.bind(this)} placeholder='Enter your email address' type='email' size='large' />

                            <div className='text-center'>
                                <Button content='Request reset link' action={this.forgotPassword.bind(this)} theme='primary' size='large' />

                                <p className='text-gray'>
                                    Back to <Link to='/login'>sign in</Link>
                                </p>
                            </div>
                        </>}
                    </div>
                </div>
            </main>
        </div >
    }
}