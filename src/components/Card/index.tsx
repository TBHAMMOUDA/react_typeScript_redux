import * as React from 'react'

import FileService from '../../services/files'
import Notification from '../../services/notification'

import './style.scss'

import Icon from '../Icon'
import Dropdown from '../Dropdown'
import DropdownItem from '../Dropdown/Item'
import DropdownSeparator from '../Dropdown/Separator'
import translate from '../../translations'
import Collaborators from '../Collaborators'

declare var $

interface IState { }
interface IPropos {
    basePath: string
    thumbnail: string
    title: string
    size: string
    type: string
    collaborators: Array<string>
    loading?: boolean
    clickAction?: any
    activeAction?: any
}

export default class Card extends React.Component<IPropos, IState> {
    getExtension(type, name) {
        if (type === 'dir') return 'Folder'
        else if (name.indexOf('.') === -1) return '-'
        else return name.split('.').pop().toUpperCase()
    }

    convertFileSize(size) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB']
        let conversions = 0

        while (size > 1024) {
            size = size / 1024
            conversions++
        }

        return `${Math.trunc(size)} ${units[conversions]}`
    }

    shareFile() {
        $('#comingSoonModal').modal('show')
        // $('#shareItemModal').modal('show')
    }

    renameFile() {
        $('#renameItemModal').modal('show')
    }

    deleteFile() {
        $('#deleteItemModal').modal('show')
    }

    copy() {
        $('#copyItemModal').modal('show')
    }

    move() {
        $('#moveItemModal').modal('show')
    }

    async download() {
        try {
            if (this.props.type === 'dir') {
                let filename = this.props.title

                try {
                    new Notification(`Please wait while '${filename}' is preparing for download`)
                    await FileService.MultipleDownload(this.getRealBasePath(this.props.basePath) + '/' + this.props.title, this.props.title)
                    new Notification(`Link to download '${filename}' should be sent to your email`)
                } catch (ex) {
                    new Notification(`Failed to download '${filename}'`)
                }
            } else {
                await FileService.Download(this.getRealBasePath(this.props.basePath) + '/' + this.props.title)
            }
        } catch (ex) {
            new Notification(`Cannot download file(s)`)
        }
    }

    getRealBasePath(basePath) {
        if (basePath === '/other projects') {
            return '/'
        } else return basePath
    }

    handleClick() {
        this.props.activeAction(this.props.title)
    }

    render() {
        let icon = 'file'
        const ext = this.getExtension(this.props.type, this.props.title)

        if (['WAV', 'MP3', 'WMA', 'AAC'].indexOf(ext) > -1) icon = 'file-audio'
        else if (['3GP', 'MP4', 'MOV', 'FLV', 'AVI', 'WMV', 'OGG'].indexOf(ext) > -1) icon = 'file-video'
        else if (['JPG', 'JPEG', 'PNG', 'GIF', 'TIFF', 'SVG', 'BMP', 'AI', 'PSD'].indexOf(ext) > -1) icon = 'file-image'
        else if (['ZIP', 'RAR', '7Z', 'GZIP', 'TAR.GZ'].indexOf(ext) > -1) icon = 'file-archive'
        else if (['XLS', 'XLSX'].indexOf(ext) > -1) icon = 'file-excel'
        else if (['DOC', 'DOCX'].indexOf(ext) > -1) icon = 'file-word'
        else if (['PPT', 'PPTX'].indexOf(ext) > -1) icon = 'file-powerpoint'
        else if (['PDF'].indexOf(ext) > -1) icon = 'file-pdf'
        else if (['HTML', 'HTM', 'XML', 'JS', 'CSS', 'PHP'].indexOf(ext) > -1) icon = 'file-code'

        if (this.props.loading) {
            return <div className='card loading'>
                <div className='card-thumbnail placeholder'></div>
                <div className='card-body'>
                    <div className='card-title'>
                        <div className='dropdown-container'>
                            <Icon name='ellipsis-v' color='gray' />
                        </div>

                        <div className='card-title-content'>
                            <div className='name placeholder'></div>
                        </div>
                    </div>

                    <div className='card-size'>
                        <div className='size placeholder'></div>
                    </div>

                    <div className='card-collaborators'>
                        <div className='collaborators placeholder'></div>
                    </div>
                </div>
            </div>
        }

        return <div onDoubleClick={this.props.clickAction} onClick={this.handleClick.bind(this)} className={['card', (this.props.type === 'dir' && 'folder')].join(' ')}>
            {this.props.type === 'dir' && <div className='blurry-head'>
                <img className='blurry-head' src={this.props.thumbnail} />
            </div>}

            <div className='card-thumbnail'>
                {/* <img src={this.props.thumbnail} /> */}
                <Icon name={icon} />
            </div>

            <div className='card-body'>
                <div className='card-title'>
                    <div className='dropdown-container'>
                        <Dropdown icon='ellipsis-v'>
                            <DropdownItem content={translate('SHARE')} action={this.shareFile} />
                            <DropdownItem content={translate('DOWNLOAD')} action={this.download.bind(this)} />
                            <DropdownSeparator />
                            <DropdownItem content={translate('RENAME')} action={this.renameFile} />
                            <DropdownItem content={translate('COPY')} action={this.copy} />
                            <DropdownItem content={translate('MOVE')} action={this.move} />
                            <DropdownItem content={translate('DELETE')} action={this.deleteFile} />
                        </Dropdown>
                    </div>

                    <div className='card-title-content'>
                        {this.props.title}
                    </div>
                </div>

                <div className='card-size'>
                    <span>
                        <Icon name={icon} />
                    </span>

                    <small>
                        {this.props.type === 'dir' && this.props.size + ' files'}
                        {this.props.type === 'file' && this.convertFileSize(this.props.size)}
                    </small>
                </div>

                <div className='card-collaborators'>
                    <Collaborators content={this.props.collaborators} />
                </div>
            </div>
        </div>
    }
}