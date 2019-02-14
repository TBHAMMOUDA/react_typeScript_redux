import * as React from 'react'

import UserService from '../../services/user'

import './style.scss'

import Button from '../Button'
import Icon from '../Icon'
import translate from '../../translations'
import Collaborators from '../Collaborators'
import Notification from '../../services/notification';


declare var $

interface IState {
    collaborators: Array<{
        name: string
        email: string
        photo: string
    }>
}
interface IPropos {
    path: string
    backAction: any
}

export default class Header extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            collaborators: []
        }
    }

    comingSoon() {
        $('#comingSoonModal').modal('show')
    }

    componentDidMount() {
        this.loadCollaborators()
    }

    async loadCollaborators() {
        try {
            let result = await UserService.TeamMembers()
            let collaborators: Array<any> = result.team.map(member => {
                return {
                    name: member.name,
                    email: member.email,
                    photo: member.photo
                }
            }).filter(member=> member.email!==localStorage.getItem('rushtera_user_email'))
            
            if (result.manager.email !== localStorage.getItem('rushtera_user_email')){
            collaborators.unshift({
                name: result.manager.name,
                email: result.manager.email,
                photo: result.manager.photo
            })}
            this.setState({
                collaborators: collaborators
            })
        } catch (ex) {
            new Notification('Cannot retrieve team members')
        }
    }

    render() {
        const path = this.props.path.substr(1)
        const pathArray = path.split('/')

        if (pathArray[0] === '') pathArray.shift()

        return <div className='header'>
            {pathArray.length > 1 && <div className='header-left'>
                <span onClick={this.props.backAction}>
                    <Icon name='arrow-circle-left' color='gray' />
                </span>
            </div>}

            <ul className='breadcrumb'>
                {(pathArray[0] !== 'uploader' && pathArray[0] !== 'other projects' && pathArray[0] !== 'recycle_bin') && <li>
                    Projects
                    <Icon name='chevron-right' color='text' />
                </li>}

                {pathArray.map((dir, index) => {
                    return <li key={dir + ':' + index}>
                        {pathArray[0] === 'recycle_bin' ? 'Recycle Bin' : dir}
                        <Icon name='chevron-right' color='text' />
                    </li>
                })}
            </ul>

            <div className='header-right'>
                <div className='plus-circle' onClick={this.comingSoon}>
                    <Icon name='plus' color='gray' />
                </div>

                <Collaborators content={this.state.collaborators} />

                <Button content={translate('SHARE')} theme='primary ml-2' action={this.comingSoon} />
            </div>
        </div>
    }
}