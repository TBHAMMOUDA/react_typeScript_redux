import * as React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'
import Search from './Search'
import Button from '../Button'
import Photo from '../Photo'
import Icon from '../Icon'
import translate from '../../translations'

declare var $

interface IState { }
interface IPropos { }

export default class Navbar extends React.Component<IPropos, IState> {
    logout() {
        localStorage.clear()
        window.location.reload()
    }

    comingSoon() {
        $('#comingSoonModal').modal('show')
    }

    render() {
        return <nav>
            <Link to='/'>
                <img src='/assets/images/logo.svg' alt='' className='logo' />
            </Link>

            <div className='nav-content'>
                <Search />

                <div className='nav-right'>
                    <Button content={translate('UPGRADE')} theme='outline primary' action={this.comingSoon} />

                    <div className='blue-circle' onClick={this.comingSoon}>
                        <Icon name='bolt' color='primary' />
                    </div>

                    <div className='dropdown'>
                        <div data-toggle='dropdown'>
                            <Photo source={localStorage.getItem('rushtera_user_photo')} letters={localStorage.getItem('rushtera_user_first_name') || localStorage.getItem('rushtera_user_email')} />
                        </div>

                        <div className='dropdown-menu dropdown-menu-right'>
                            <Link className='dropdown-item' to='/settings/edit-profile'>{translate('EDIT_PROFILE')}</Link>
                            <Link className='dropdown-item' to='/settings/account-settings'>{translate('ACCOUNT_SETTINGS')}</Link>
                            <div className='dropdown-divider'></div>
                            <a className='dropdown-item' onClick={this.comingSoon}>{translate('UPGRADE')}</a>
                            <a className='dropdown-item' onClick={this.comingSoon}>{translate('HELP_CENTER')}</a>
                            <a className='dropdown-item' onClick={this.logout}>{translate('LOG_OUT')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    }
}