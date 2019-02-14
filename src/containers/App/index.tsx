import * as React from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import UserAction from '../../actions/user'
import UserService from '../../services/user'

import './style.scss'

import Home from '../Home'
import Login from '../Login'
import ForgotPassword from '../Password/Forgot'
import ResetPassword from '../Password/Reset'
import Error from '../Error'
import Error404 from '../Error/404'
import Settings from '../Settings'
import NotificationComponent from '../../components/Notification';
import Modal from '../../components/Modal';
import translate from '../../translations';
import SmallModal from '../../components/Modal/Small';
import Register from '../Register';
import Activation from '../Activation';
import Notification from '../../services/notification';

interface IStates {
    notifications: Array<string>
    errorDetails: string
    hasError: boolean
    isUser: boolean
}

interface IPropos {
    history: any
}

export default class App extends React.Component<IPropos, IStates> {
    constructor(props) {
        super(props)

        this.state = {
            notifications: [],
            errorDetails: '',
            hasError: false,
            isUser: localStorage.getItem('user_token') !== null
        }

        let self = this

        document.addEventListener('notification', function (event: any) {
            const notifs = self.state.notifications.map(n => n)
            notifs.push(event.detail)
            self.setState({ notifications: notifs })
        })

        document['Notification'] = Notification
    }

    componentDidMount() {
        this.checkUser()
    }

    async checkUser() {
        if (this.state.isUser) {
            try {
                let result = await UserService.Retrieve()

                localStorage.setItem('user_first_name', result.first_name)             
            } catch (exception) {
                localStorage.clear()
                window.location.reload()
            }
        }
    }

    componentDidCatch(error) {
        this.setState({ hasError: true, errorDetails: error })
    }

    render() {
        let isGuest = <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route exact path='/reset-password/:id' component={ResetPassword} />
            <Redirect from='*' to='/login' />
        </Switch>

        let isUser = <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/activation' component={Activation} />
            <Route exact path='/settings/:page' component={Settings} />
            <Redirect from='/login' to='/' />
            <Redirect from='/register' to='/activation' />
            <Route path='/' component={Error404} />
        </Switch>

        if (this.state.hasError) {
            return <Error details={this.state.errorDetails} />
        }

        return <div>
            {this.state.isUser ? isUser : isGuest}

            <SmallModal id='comingSoonModal' icon='hourglass-start' title='Coming Soon' actionContent={translate('CLOSE')} actionCallback={null}>
                We are working on this feature. We will share with you our updates soon.
            </SmallModal>

            <div className='notifications-container'>
                {this.state.notifications.map((message, index) => <NotificationComponent key={index} message={message} />)}
            </div>
        </div>
    }
}