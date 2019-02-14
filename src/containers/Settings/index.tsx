import * as React from 'react'

import UserService from '../../services/user'
import Notification from '../../services/notification'

import './style.scss'

import Navbar from '../../components/Navbar'
import Tab from '../../components/Tab'
import TabItem from '../../components/Tab/Item'
import Entry from '../../components/Entry'
import Button from '../../components/Button'

import translate from '../../translations'
import Select from '../../components/Select'
import SelectItem from '../../components/Select/Item'
import Photo from '../../components/Photo'
import Soon from '../../components/Soon'
import Checkbox from '../../components/Checkbox'

// declare var $

interface IState {
    activeView: string
    edit_profile: {
        first_name: string
        last_name: string
        email: string
        title: string
        phone_number: string
        location: string
        company: string
        language: string
    }
}

interface IPropos {
    history: any
    match: any
}

export default class Settings extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            activeView: this.props.match.params.page,
            edit_profile: {
                first_name: localStorage.getItem('user_first_name') === 'null' ? '' : localStorage.getItem('user_first_name'),
                last_name: localStorage.getItem('user_last_name') === 'null' ? '' : localStorage.getItem('user_last_name'),
                email: localStorage.getItem('user_email') === 'null' ? '' : localStorage.getItem('user_email'),
                title: localStorage.getItem('user_title') === 'null' ? '' : localStorage.getItem('user_title'),
                phone_number: localStorage.getItem('user_phone_number') === 'null' ? '' : localStorage.getItem('user_phone_number'),
                location: localStorage.getItem('user_location') === 'null' ? '' : localStorage.getItem('user_location'),
                company: localStorage.getItem('user_company') === 'null' ? '' : localStorage.getItem('user_company'),
                language: localStorage.getItem('user_language') === 'null' ? '' : localStorage.getItem('user_language')
            }
        }
    }

    firstNameChanged(event) { this.setState({ edit_profile: Object.assign({}, this.state.edit_profile, { first_name: event.target.value }) }) }
    lastNameChanged(event) { this.setState({ edit_profile: Object.assign({}, this.state.edit_profile, { last_name: event.target.value }) }) }
    titleChanged(event) { this.setState({ edit_profile: Object.assign({}, this.state.edit_profile, { title: event.target.value }) }) }
    phone_numberChanged(event) { this.setState({ edit_profile: Object.assign({}, this.state.edit_profile, { phone_number: event.target.value }) }) }
    locationChanged(event) { this.setState({ edit_profile: Object.assign({}, this.state.edit_profile, { location: event.target.value }) }) }
    companyChanged(event) { this.setState({ edit_profile: Object.assign({}, this.state.edit_profile, { company: event.target.value }) }) }
    languageChanged(event) { this.setState({ edit_profile: Object.assign({}, this.state.edit_profile, { language: event.target.value }) }) }

    async saveEditProfile() {
        try {
            const result = await UserService.EditProfile(
                this.state.edit_profile.first_name,
                this.state.edit_profile.last_name,
                this.state.edit_profile.title,
                this.state.edit_profile.phone_number,
                this.state.edit_profile.location,
                this.state.edit_profile.company,
                this.state.edit_profile.language
            )

            if (result.success === false) {
                this.props.history.push('/activation')
            } else {
                new Notification(`Your profile details are now updated`)

                if (localStorage.getItem('user_language') !== this.state.edit_profile.language) {
                    localStorage.setItem('user_language', this.state.edit_profile.language)
                    new Notification(`The page will reload to switch language`)

                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);
                }
            }
        } catch (ex) {
            new Notification(`Cannot update your profile`)
        }
    }

    navigate(view) {
        this.props.history.push('/settings/' + view)
        this.setState({ activeView: view })
    }

    render() {
        return <>
            <Navbar />

            <Tab center>
                <TabItem content={translate('EDIT_PROFILE')} action={() => { this.navigate('edit-profile') }} active={this.state.activeView === 'edit-profile'} />
                <TabItem content={translate('ACCOUNT_SETTINGS')} action={() => { this.navigate('account-settings') }} active={this.state.activeView === 'account-settings'} />
                <TabItem content={translate('SUBSCRIPTION')} action={() => { this.navigate('subscription') }} active={this.state.activeView === 'subscription'} />
                <TabItem content={translate('NOTIFICATIONS')} action={() => { this.navigate('notifications') }} active={this.state.activeView === 'notifications'} />
                <TabItem content={translate('UPLOAD_SETTINGS')} action={() => { this.navigate('upload-settings') }} active={this.state.activeView === 'upload-settings'} />
                <TabItem content={translate('SHARE_SETTINGS')} action={() => { this.navigate('share-settings') }} active={this.state.activeView === 'share-settings'} />
            </Tab>

            <div className='settings'>
                <div className='container fixed-container'>
                    {this.state.activeView === 'edit-profile' && <div className='row'>
                        <div className='col-12'>
                            <Photo source={localStorage.getItem('user_photo')} letters={this.state.edit_profile.email} size='large' />
                        </div>

                        <div className='col-6'>
                            <Entry label={translate('FIRST_NAME') + ' (' + translate('DISPLAY_NAME') + ')'} type='text' placeholder={translate('FIRST_NAME_PLACEHOLDER')} value={this.state.edit_profile.first_name} onChange={this.firstNameChanged.bind(this)} />
                        </div>

                        <div className='col-6'>
                            <Entry label={translate('LASTNAME_NAME')} type='text' placeholder={translate('LAST_NAME_PLACEHOLDER')} value={this.state.edit_profile.last_name} onChange={this.lastNameChanged.bind(this)} />
                        </div>

                        <div className='col-6'>
                            <Entry label={translate('EMAIL_ADDRESS')} type='email' placeholder={translate('EMAIL_ADDRESS_PLACEHOLDER')} value={this.state.edit_profile.email} />
                        </div>

                        <div className='col-6'>
                            <Entry label={translate('LOCATION')} type='text' placeholder={translate('LOCATION_PLACEHOLDER')} value={this.state.edit_profile.location} onChange={this.locationChanged.bind(this)} />
                        </div>

                        <div className='col-6'>
                            <Entry label={translate('PHONE_NUMBER')} type='text' placeholder={translate('PHONE_NUMBER_PLACEHOLDER')} value={this.state.edit_profile.phone_number} onChange={this.phone_numberChanged.bind(this)} />
                        </div>

                        <div className='col-6'>
                            <Entry label={translate('COMPANY')} type='text' placeholder={translate('COMPANY_PLACEHOLDER')} value={this.state.edit_profile.company} onChange={this.companyChanged.bind(this)} />
                        </div>

                        <div className='col-6'>
                            <Entry label={translate('TITLE')} type='text' placeholder={translate('TITLE_PLACEHOLDER')} value={this.state.edit_profile.title} onChange={this.titleChanged.bind(this)} />
                        </div>

                        <div className='col-6'>
                            <Select onChange={this.languageChanged.bind(this)} label={translate('LANGUAGE')}>
                                <SelectItem value='en' content='English' selected={this.state.edit_profile.language === 'en'} />
                                <SelectItem value='fr' content='Français' selected={this.state.edit_profile.language === 'fr'} />
                            </Select>
                        </div>

                        <div className='col-6'></div>

                        <div className='col-12'>
                            <Button content={translate('SAVE_CHANGES')} theme='primary' size='large' action={this.saveEditProfile.bind(this)} />
                        </div>
                    </div>}

                    {this.state.activeView === 'account-settings' && <div className=''>
                        <Soon />
                    </div>}

                    {this.state.activeView === 'subscription' && <div className=''>
                        <Soon />
                    </div>}

                    {this.state.activeView === 'notifications' && <div className='notifications'>
                        <h6>{translate('NOTIFICATIONS')}</h6>
                        <p className='mb-5'>You can manage here notifications you will receive from Us</p>

                        <Checkbox content='Enable transcode notifications' />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit est saepe esse debitis tempora facilis rem eaque.</p>

                        <Checkbox content='Enable file download notifications' />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit est saepe esse debitis tempora facilis rem eaque.</p>

                        <Checkbox content='Enable file uploads notifications' />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit est saepe esse debitis tempora facilis rem eaque.</p>

                        <Checkbox content='Enable team members notifications' />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit est saepe esse debitis tempora facilis rem eaque.</p>
                    </div>}

                    {this.state.activeView === 'upload-settings' && <div className=''>
                        <Soon />
                    </div>}

                    {this.state.activeView === 'share-settings' && <div className=''>
                        <Soon />
                    </div>}
                </div>
            </div>
        </>
    }
}