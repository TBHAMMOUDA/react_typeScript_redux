import * as React from 'react'
import { Link } from 'react-router-dom'

import UserService from '../../services/user'

import './style.scss'

import Button from '../../components/Button'
import Entry from '../../components/Entry'

interface IState {
    loginFailed: boolean
    email: string
    password: string
    coverPhoto: string
}

interface IPropos { }

export default class Login extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            loginFailed: false,
            email: '',
            password: '',
            coverPhoto: this.random()
        }
    }

    emailChanged(event) { this.setState({ email: event.target.value }) }
    passwordChanged(event) { this.setState({ password: event.target.value }) }

    random() {
        const covers = [
            '/assets/images/cover-1.jpg',
            '/assets/images/cover-2.jpg',
            '/assets/images/cover-3.jpg'
        ]

        return covers[Math.random() * covers.length >> 0]
    }

    async login() {
        try {
            let result = await UserService.Login(this.state.email, this.state.password)

            if ('access_token' in result) {
                localStorage.setItem('last_active_project', 'other projects')
                localStorage.setItem('user_email', this.state.email)
                localStorage.setItem('user_token', result.access_token)
                window.location.reload()
            } else {
                this.setState({ loginFailed: true })
            }
        } catch (exception) {
            this.setState({ loginFailed: true })
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
                        <h1>Welcome to <span className='text-primary'>BhRx File Manager </span></h1>

                        <p className='text-gray'>
                            Limitless file sharing and streaming for production, post-production, and distribution. Fast, simple, secure.
                        </p>

                        {this.state.loginFailed && <p className='text-danger'>
                            Oops, email or password combination is not correct!
                        </p>}

                        <Entry label='Email Address' onChange={this.emailChanged.bind(this)} placeholder='Enter email' type='email' size='large' />
                        <Entry label='Password' onChange={this.passwordChanged.bind(this)} placeholder='Enter password' type='password' linkContent='Forgot password?' linkTo='/forgot-password' size='large' />

                        <div className='text-center'>
                            <Button content='Login' action={this.login.bind(this)} theme='primary' size='large' />

                            <p className='text-gray'>
                                Don't have an account? <Link to='/register'>Register now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    }
}