import * as React from 'react'
import * as Moment from 'moment'

import FileService from '../../../../services/files'
import Notification from '../../../../services/notification'

import './style.scss'
import TableRow from '..'
import TableColumn from '../../Column'
import Collaborators from '../../../Collaborators'
import Button from '../../../Button'
import Dropdown from '../../../Dropdown'
import DropdownItem from '../../../Dropdown/Item'
import DropdownSeparator from '../../../Dropdown/Separator'
import translate from '../../../../translations'
import Icon from '../../../Icon'

declare var $

interface IState { }
interface IPropos {
    basePath: string
    name: string
    size: string
    countFiles?: string
    type: string
    date: string
    loading?: boolean
    clickAction?: any
    activeAction?: any
}

export default class MediaRow extends React.Component<IPropos, IState> {
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

    countFiles() {
        if (String(this.props.countFiles) === '0') return 'No files'
        else return `${this.props.countFiles} files`
    }

    comingSoon() {
        $('#comingSoonModal').modal('show')
    }

    shareFile() {
        $('#shareItemModal').modal('show')
    }

    renameFile() {
        $('#renameItemModal').modal('show')
    }

    deleteFile() {
        $('#deleteItemModal').modal('show')
    }

    copy() {
        $('#comingSoonModal').modal('show')
    }

    move() {
        $('#comingSoonModal').modal('show')
    }

    async download() {
        try {
            if (this.props.type === 'dir') {
                let filename = this.props.name

                try {
                    new Notification(`Please wait while '${filename}' is preparing for download`)
                    await FileService.MultipleDownload(this.getRealBasePath(this.props.basePath) + '/' + this.props.name, this.props.name)
                    new Notification(`Link to download '${filename}' should be sent to your email`)
                } catch (ex) {
                    new Notification(`Failed to download '${filename}'`)
                }
            } else {
                FileService.Download(this.getRealBasePath(this.props.basePath) + '/' + this.props.name)
            }
        } catch (ex) {
            new Notification(`Cannot download file(s)`)
        }
    }

    handleClick() {
        this.props.activeAction(this.props.name)
    }

    getRealBasePath(basePath) {
        if (basePath === '/other projects') {
            return '/'
        } else return basePath
    }

    render() {
        let icon = 'file'
        const ext = this.getExtension(this.props.type, this.props.name)

        if (['Folder'].indexOf(ext) > -1) icon = 'folder'
        else if (['WAV', 'MP3', 'WMA', 'AAC'].indexOf(ext) > -1) icon = 'file-audio'
        else if (['3GP', 'MP4', 'MOV', 'FLV', 'AVI', 'WMV', 'OGG'].indexOf(ext) > -1) icon = 'file-video'
        else if (['JPG', 'JPEG', 'PNG', 'GIF', 'TIFF', 'SVG', 'BMP', 'AI', 'PSD'].indexOf(ext) > -1) icon = 'file-image'
        else if (['ZIP', 'RAR', '7Z', 'GZIP', 'TAR.GZ'].indexOf(ext) > -1) icon = 'file-archive'
        else if (['XLS', 'XLSX'].indexOf(ext) > -1) icon = 'file-excel'
        else if (['DOC', 'DOCX'].indexOf(ext) > -1) icon = 'file-word'
        else if (['PPT', 'PPTX'].indexOf(ext) > -1) icon = 'file-powerpoint'
        else if (['PDF'].indexOf(ext) > -1) icon = 'file-pdf'
        else if (['HTML', 'HTM', 'XML', 'JS', 'CSS', 'PHP'].indexOf(ext) > -1) icon = 'file-code'

        if (this.props.loading) {
            return <TableRow>
                <TableColumn type='loading-image' content='' />
                <TableColumn type='loading' content='' />
                <TableColumn type='loading' content='' />
                <TableColumn type='loading' content='' />
                <TableColumn type='loading' content='' />

                <TableColumn align='right'>
                    <div className='dropdown-container'>
                        <Icon name='ellipsis-h' color='gray' />
                    </div>
                </TableColumn>
            </TableRow>
        } else {
            return <tr onDoubleClick={this.props.clickAction} onClick={this.handleClick.bind(this)}>
                {this.props.type === 'dir' && <TableColumn type='image-folder' content={this.countFiles()} />}
                {this.props.type !== 'dir' && <TableColumn type='image-icon' content={icon} />}
                <TableColumn type='text' content={this.props.name} />
                <TableColumn type='text' content={this.convertFileSize(this.props.size)} />
                <TableColumn type='text' content={this.getExtension(this.props.type, this.props.name)} />
                <TableColumn type='text' content={Moment(this.props.date).format('MM/DD/YYYY')} />

                {/* <TableColumn>
                    <Collaborators content={[]} />
                </TableColumn> */}

                <TableColumn align='right' >
                    <Button content='Share' theme='outline border-less primary share mr-1' action={this.comingSoon} />

                    <Dropdown>
                        <DropdownItem content={translate('DOWNLOAD')} action={this.download.bind(this)} />
                        <DropdownSeparator />
                        <DropdownItem content={translate('RENAME')} action={this.renameFile} />
                        <DropdownItem content={translate('COPY')} action={this.copy} />
                        <DropdownItem content={translate('MOVE')} action={this.move} />
                        <DropdownItem content={translate('DELETE')} action={this.deleteFile} />
                    </Dropdown>
                </TableColumn>
            </tr >
        }
    }
}