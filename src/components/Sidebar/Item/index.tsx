import * as React from 'react'

import FileService from '../../../services/files'
import Notification from '../../../services/notification'

import './style.scss'

import Icon from '../../Icon';
import Dropdown from '../../Dropdown'
import DropdownItem from '../../Dropdown/Item'
import translate from '../../../translations'

declare var $

interface IState { }
interface IPropos {
    content: string
    active?: boolean
    action: any
    deleteAction: any
    loading?: boolean
    icon?: string
}

export default class SidebarItem extends React.Component<IPropos, IState> {
    deleteProject() {
        if (this.props.content !== 'other projects') $('#deleteProjectModal').modal('show')
        else new Notification('You cannot delete this project')
    }

    async downloadProject() {
        let path = this.props.content !== '/other projects' ? this.props.content : '/'
        let filename = this.props.content.substr(this.props.content.lastIndexOf('/') + 1)
        let realfilename = path.substr(path.lastIndexOf('/') + 1)

        try {
            new Notification(`Please wait while '${filename}' is preparing for download`)
            await FileService.MultipleDownload('/' + path, realfilename || 'other-projects')
            new Notification(`Link to download '${filename}' should be sent to your email`)
        } catch (ex) {
            new Notification(`Failed to download '${filename}'`)
        }
    }

    projectSettings() {
        $('#comingSoonModal').modal('show')
        // $('#projectSettingsModal').modal('show')
    }

    render() {
        if (this.props.loading) return <li className='sidebar-item loading'>
            <Icon name='folder' />
            <span className='content placeholder'></span>
        </li>

        else return <li className={['sidebar-item', (this.props.active ? 'active' : '')].join(' ')}>
            {!this.props.icon && <div className='dropdown-container'>
                <Dropdown>
                    <DropdownItem content={translate('SETTINGS')} action={this.projectSettings} />
                    <DropdownItem content={translate('DOWNLOAD_ALL_FILES')} action={this.downloadProject.bind(this)} />
                    <DropdownItem content={translate('DELETE_PROJECT')} action={() => { this.props.deleteAction(); this.deleteProject() }} />
                </Dropdown>
            </div>}

            <div className='sidebar-item-content' onClick={this.props.action}>
                {!this.props.icon ? <Icon style='solid' name='folder' /> : <Icon name={this.props.icon} />}
                <span>{this.props.content}</span>
            </div>
        </li>
    }
}