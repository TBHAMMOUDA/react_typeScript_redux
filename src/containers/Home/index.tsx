import * as React from 'react'
import { connect } from 'react-redux'

import ProjectService from '../../services/projects'
import ProjectActions from '../../actions/projects'

import LinkService from '../../services/links'
import LinkActions from '../../actions/links'

import UploadActions from '../../actions/uploads'
import FileService from '../../services/files'
import FileActions from '../../actions/files'


import './style.scss'

import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Tab from '../../components/Tab'
import TabItem from '../../components/Tab/Item'
import TabIcon from '../../components/Tab/Icon'
import View from '../../components/View'
import Card from '../../components/Card'
import CardUpload from '../../components/Card/Upload'
import Modal from '../../components/Modal'
import translate from '../../translations'
import Table from '../../components/Table'
import TableHeader from '../../components/Table/Header'
import MediaRow from '../../components/Table/Row/Media'
import LinkRow from '../../components/Table/Row/Link'
import Entry from '../../components/Entry'
import Empty from '../../components/Empty'
import ContextMenu from '../../components/ContextMenu'
import Notification from '../../services/notification'
import SmallModal from '../../components/Modal/Small'
import CardUploader from '../../components/Card/Uploader';
import FoldersTree from '../../components/FoldersTree';
import Soon from '../../components/Soon';

declare var $

interface IState {
    loadingFiles: boolean
    loadingProjects: boolean
    loadingLinks: boolean
    loadingFilesFailed: boolean
    loadingProjectsFailed: boolean
    loadingLinksFailed: boolean
    activeProject: string
    activeView: string
    viewMode: string
    basePath: string
    destinationPath: string
    workingProject: {
        name: string
        nameInvalidMessage: string
    }
    workingItem: {
        name: string
        newName: string
        nameInvalidMessage: string
    }
}

interface IPropos {
    projects: Array<any>
    uploads: Array<any>
    files: Array<any>
    links: Array<any>
    dispatch: any
}

class Home extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            loadingFiles: false,
            loadingProjects: true,
            loadingLinks: true,
            loadingFilesFailed: false,
            loadingProjectsFailed: false,
            loadingLinksFailed: false,
            activeProject: this.nullHandler(localStorage.getItem('last_active_project')),
            activeView: 'media',
            viewMode: 'cards',
            basePath: '/' + this.nullHandler(localStorage.getItem('last_active_project')),
            destinationPath: '',
            workingProject: {
                name: '',
                nameInvalidMessage: ''
            },
            workingItem: {
                name: '',
                newName: '',
                nameInvalidMessage: ''
            }
        }

        const self = this

        document.addEventListener('createUpload', function (event: any) {
            const data = event.detail
            self.props.dispatch(UploadActions.Create(data))
        })

        document.addEventListener('updateUpload', function (event: any) {
            const data = event.detail
            self.props.dispatch(UploadActions.Update(data))
        })

        document.addEventListener('deleteUpload', function (event: any) {
            const data = event.detail
            self.props.dispatch(UploadActions.Delete(data))
        })
    }

    nullHandler(input) {
        if (input) return input
        else return ''
    }

    setActiveProject(project) {
        try {
            const newPath = '/' + project

            if (newPath !== '/') this.loadFiles(newPath)
            this.setState({ activeProject: project, basePath: newPath })
            localStorage.setItem('last_active_project', project)
        } catch (ex) {
            new Notification(`Cannot load project files`)
        }
    }

    setActiveView(view) {
        this.setState({ activeView: view })
        localStorage.setItem('last_active_view', view)
    }

    setViewMode(mode) {
        this.setState({ viewMode: mode })
        localStorage.setItem('last_active_mode', mode)
    }

    projectNameChanged(event) {
        const name = event.target.value
        const pattern = /^[^\\/:\*\?"<>\|]+$/

        if (pattern.test(name)) {
            const exist = this.props.projects.filter(p => p.name.toLowerCase() === name.toLowerCase()).length > 0

            if (exist) {
                this.setState({
                    workingProject: {
                        name: name,
                        nameInvalidMessage: 'A project with that name already exist'
                    }
                })
            } else { this.setState({ workingProject: { name: name, nameInvalidMessage: '' } }) }
        } else {
            this.setState({ workingProject: { name: name, nameInvalidMessage: 'Project name must not include special characters' } })
        }
    }

    itemNameChanged(event) {
        const name = event.target.value
        const pattern = /^[^\\/:\*\?"<>\|]+$/

        if (pattern.test(name)) {
            const exist = this.props.files.filter(p => p.name.toLowerCase() === name.toLowerCase()).length > 0

            if (exist) {
                this.setState({
                    workingItem: {
                        name: this.state.workingItem.name,
                        newName: event.target.value,
                        nameInvalidMessage: 'An item with that name already exist'
                    }
                })
            } else { this.setState({ workingItem: { name: this.state.workingItem.name, newName: event.target.value, nameInvalidMessage: '' } }) }
        } else {
            this.setState({ workingItem: { name: this.state.workingItem.name, newName: event.target.value, nameInvalidMessage: 'Folder name must not include special characters' } })
        }
    }

    setWorkingItem(name) { this.setState({ workingItem: { name, newName: name, nameInvalidMessage: this.state.workingItem.nameInvalidMessage } }) }

    destinationPathChanged(path) { this.setState({ destinationPath: path }) }

    async createProject() {
        try {
            let data = await ProjectService.Create(this.state.workingProject.name)
            this.props.dispatch(ProjectActions.Create(data))
            $('#newProjectModal').modal('hide')

            new Notification(`The new project '${this.state.workingProject.name}' is now created`)
            this.setActiveProject(this.state.workingProject.name)
            this.setState({ workingProject: { name: '', nameInvalidMessage: this.state.workingProject.nameInvalidMessage } })
        } catch (ex) {
            new Notification(`Cannot create new project`)
        }
    }

    async deleteProject() {
        try {
            await ProjectService.Delete(this.state.workingProject.name)
            this.props.dispatch(ProjectActions.Delete(this.state.workingProject.name))
            $('#deleteProjectModal').modal('hide')

            new Notification(`The project '${this.state.workingProject.name}' is now deleted`)
            this.setState({ workingProject: { name: '', nameInvalidMessage: this.state.workingProject.nameInvalidMessage } })
            this.setActiveProject('')
        } catch (ex) {
            new Notification(`Cannot delete project`)
        }
    }

    async createFolder() {
        try {
            let data = await FileService.CreateFolder(this.getRealBasePath(this.state.basePath) + '/' + this.state.workingItem.newName)
            this.props.dispatch(FileActions.Create(data))
            $('#newFolderModal').modal('hide')

            new Notification(`The new folder '${this.state.workingItem.newName}' is now created`)
            this.setState({ workingItem: { name: '', newName: '', nameInvalidMessage: '' } })
        } catch (ex) {
            new Notification(`Cannot create new folder`)
        }
    }

    async deleteItem() {
        try {
            await FileService.Delete(this.getRealBasePath(this.state.basePath) + '/' + this.state.workingItem.name)
            this.props.dispatch(FileActions.Delete(this.state.workingItem.name))
            $('#deleteItemModal').modal('hide')

            new Notification(`The item '${this.state.workingItem.name}' is now deleted`)
            this.setState({ workingItem: { name: '', newName: '', nameInvalidMessage: '' } })
        } catch (ex) {
            new Notification(`Cannot delete item`)
        }
    }

    async renameItem() {
        try {
            await FileService.Rename(this.getRealBasePath(this.state.basePath) + '/' + this.state.workingItem.name, this.state.basePath + '/' + this.state.workingItem.newName)
            this.props.dispatch(FileActions.Rename(this.state.workingItem.name, this.state.workingItem.newName))
            $('#renameItemModal').modal('hide')

            new Notification(`The item '${this.state.workingItem.name}' is now renamed to '${this.state.workingItem.newName}'`)
        } catch (ex) {
            new Notification(`Cannot rename item`)
        }
    }

    async copyItem() {
        try {
            await FileService.Copy((this.state.basePath === '/other projects' ? '/' : this.state.basePath) + '/' + this.state.workingItem.name, this.state.destinationPath)
            $('#copyItemModal').modal('hide')

            new Notification(`The item '${this.state.workingItem.name}' is now copied to '${this.state.destinationPath}'`)
        } catch (ex) {
            new Notification(`Failed to copy the file`)
        } finally {
            $('#copyItemModal').modal('hide')
        }
    }

    async moveItem() {
        try {
            await FileService.Move((this.state.basePath === '/other projects' ? '/' : this.state.basePath) + '/' + this.state.workingItem.name, this.state.destinationPath)
            this.props.dispatch(FileActions.Delete(this.state.workingItem.name))
            $('#moveItemModal').modal('hide')

            new Notification(`The item '${this.state.workingItem.name}' is now moved to '${this.state.destinationPath}'`)
        } catch (ex) {
            new Notification(`Failed to move the file`)
        } finally {
            $('#moveItemModal').modal('hide')
        }
    }

    getRealBasePath(basePath) {
        if (basePath === '/other projects') {
            return '/'
        } else return basePath
    }

    async openFolder(name) {
        const newPath = this.state.basePath + '/' + name
        this.setState({ basePath: newPath })
        this.loadFiles(newPath)
    }

    async goBack() {
        const basePath = this.state.basePath
        const newPath = basePath.substr(0, basePath.lastIndexOf('/'))
        this.setState({ basePath: newPath })
        this.loadFiles(newPath)
    }

    componentDidMount() {
        this.props.dispatch(FileActions.Retrieve([]))
        this.loadProjects()

        if (this.state.basePath !== '/') {
            this.loadFiles(this.state.basePath)
        }
    }

    async loadProjects() {
        try {
            this.setState({ loadingProjects: true })
            let projects: Array<any> = await ProjectService.Get()

            projects.push({
                'size': 4096,
                'name': 'other projects',
                'date': '',
                'path': '/mnt/data/personal/user@email/other projects',
                'type': 'dir',
                'files_nbr': 0
            })

            this.props.dispatch(ProjectActions.Retrieve(projects))
            this.setState({ loadingProjects: false })
        } catch (ex) {
            new Notification(`Cannot load projects`)
        }
    }

    async loadFiles(path) {
        try {
            if (path !== '/other projects') {
                this.setState({ loadingFiles: true })
                let files = await FileService.Get(path)
                this.props.dispatch(FileActions.Retrieve(files.filter(file => file.name.indexOf('.ajxp_') === -1)))
                this.setState({ loadingFiles: false })
            } else {
                this.setState({ loadingFiles: true })
                let projects: Array<any> = await ProjectService.Get()
                this.props.dispatch(FileActions.Retrieve(projects.filter(file => file.type === 'file' && file.name.indexOf('.ajxp_') === -1)))
                this.setState({ loadingFiles: false })
            }
        } catch (ex) {
            new Notification(`Cannot load project files`)
        }
    }

    clearWorkingItem() { this.setState({ workingItem: { name: '', newName: '', nameInvalidMessage: '' } }) }

    newProjectHandler() {
        this.setState({ workingProject: { name: '', nameInvalidMessage: '' } })
        $('#newProjectModal').modal('show')
    }

    async downloadAll() {
        let path = this.state.basePath !== '/other projects' ? this.state.basePath : '/'
        let filename = this.state.basePath.substr(this.state.basePath.lastIndexOf('/') + 1)
        let realfilename = path.substr(path.lastIndexOf('/') + 1)

        try {
            new Notification(`Please wait while '${filename}' is preparing for download`)
            await FileService.MultipleDownload(this.getRealBasePath(path), realfilename || 'other-projects')
            new Notification(`Link to download '${filename}' should be sent to your email`)
        } catch (ex) {
            new Notification(`Failed to download '${filename}'`)
        }
    }

    render() {
        return <>
            <Navbar />

            <Sidebar failed={this.state.loadingProjectsFailed} items={this.props.projects} newProjectHandler={this.newProjectHandler.bind(this)} activeItem={this.state.activeProject} itemAction={this.setActiveProject.bind(this)} itemDeleteAction={(name) => { this.setState({ workingProject: { name: name, nameInvalidMessage: '' } }) }} loadingState={this.state.loadingProjects} />

            <div className='home'>
                <Header path={this.state.basePath} backAction={this.goBack.bind(this)} />

                <Tab>
                    {this.state.basePath !== '/' && this.state.activeProject !== 'recycle_bin' && this.state.activeProject !== 'uploader' && <TabItem content={translate('MEDIA')} action={() => { this.setActiveView('media') }} active={this.state.activeView === 'media'} />}
                    {this.state.basePath !== '/' && this.state.activeProject !== 'recycle_bin' && this.state.activeProject !== 'uploader' && <TabItem content={translate('LINKS')} action={() => { this.setActiveView('links') }} active={this.state.activeView === 'links'} />}
                    {this.state.activeView === 'media' && <TabIcon icon='list' action={() => { this.setViewMode('list') }} active={this.state.viewMode === 'list'} />}
                    {this.state.activeView === 'media' && <TabIcon icon='th' action={() => { this.setViewMode('cards') }} active={this.state.viewMode === 'cards'} />}
                </Tab>

                {this.state.activeView === 'media' && this.state.viewMode === 'cards' && <View id='grid-media-view'>
                    {!this.state.loadingFiles && this.state.basePath !== '/' && this.state.activeProject !== 'recycle_bin' && this.state.activeProject !== 'uploader' && <ContextMenu downloadAction={this.downloadAll.bind(this)} clearWorkingItem={this.clearWorkingItem.bind(this)} target='grid-media-view' />}
                    {!this.state.loadingFiles && this.props.files.map((file) => <Card key={file.path} basePath={this.state.basePath} title={file.name} type={file.type} size={file.type === 'dir' ? file.files_nbr : file.size} thumbnail='' collaborators={[]} {...(file.type === 'dir' && { clickAction: () => { this.openFolder(file.name) } })} activeAction={this.setWorkingItem.bind(this)} />)}
                    {this.state.loadingFiles && [0, 1, 2].map((item, index) => <Card key={index} basePath={''} title='' type='' size='' thumbnail='' collaborators={[]} loading />)}
                    {!this.state.loadingFiles && this.state.basePath !== '/' && this.props.uploads.filter(item => item.path === this.state.basePath).map((item, index) => <CardUploader key={index} progress={item.progress} speed={item.speed} timeLeft={item.timeLeft} path={item.path} title={item.filename} />)}
                    {!this.state.loadingFiles && this.state.basePath !== '/' && this.state.activeProject !== 'recycle_bin' && this.state.activeProject !== 'uploader' && <CardUpload basePath={this.state.basePath} />}
                </View>}

                {this.state.activeView === 'media' && this.state.viewMode === 'list' && <View id='list-media-view'>
                    <Table>
                        <TableHeader items={['', translate('NAME'), translate('SIZE'), translate('TYPE'), translate('MODIFIED'), /* translate('MEMBERS') */, '']} />
                        <tbody>
                            {!this.state.loadingFiles && this.props.files.map((file) => <MediaRow key={file.path} basePath={this.state.basePath} name={file.name} size={file.size} countFiles={file.files_nbr} type={file.type} date={file.date} {...(file.type === 'dir' && { clickAction: () => { this.openFolder(file.name) } })} activeAction={this.setWorkingItem.bind(this)} />)}
                            {this.state.loadingFiles && [0, 1, 2].map((item, index) => <MediaRow key={index} basePath={''} name='' size='' type='' date='' loading />)}
                            {!this.state.loadingFiles && this.state.basePath !== '/' && this.props.uploads.filter(item => item.path === this.state.basePath).map((item, index) => <CardUploader key={index} progress={item.progress} speed={item.speed} timeLeft={item.timeLeft} path={item.path} title={item.filename} row={true} />)}
                            {!this.state.loadingFiles && this.state.basePath !== '/' && this.state.activeProject !== 'recycle_bin' && this.state.activeProject !== 'uploader' && <CardUpload basePath={this.state.basePath} row />}
                        </tbody>
                    </Table>

                    {!this.state.loadingFiles && this.state.basePath !== '/' && this.state.activeProject !== 'recycle_bin' && this.state.activeProject !== 'uploader' && <ContextMenu downloadAction={this.downloadAll.bind(this)} clearWorkingItem={this.clearWorkingItem.bind(this)} target='list-media-view' />}
                </View>}

                {this.state.activeView === 'links' && <View>
                    {/* <Table>
                        <TableHeader items={['', translate('LINK'), translate('VIEWS'), translate('ACTIVE'), translate('PASSWORD'), translate('EXPIRATION'), '']} />
                        {!this.state.loadingLinks && this.props.links.map((link, index) => <LinkRow key={index} name={link.name} active={link.active} expiration={link.expiration} views={link.views} password={link.password} />)}
                    </Table> */}

                    {/* <Empty icon='link' headline='You have no links yet' message='Create your first link and share it with other members' /> */}

                    <Soon />
                </View>}
            </div>

            <Modal icon='layer-group' id='newProjectModal' title='Create new project' actionContent={translate('CREATE')} actionCallback={this.createProject.bind(this)} valid={this.state.workingProject.nameInvalidMessage.length > 0}>
                <Entry label='Project Name' placeholder='e.g. Deadpool' type='text' onChange={this.projectNameChanged.bind(this)} value={this.state.workingProject.name} isInvalid={this.state.workingProject.nameInvalidMessage.length > 0} invalidMessage={this.state.workingProject.nameInvalidMessage} />
            </Modal>

            <SmallModal icon='trash' iconTheme='danger' id='deleteProjectModal' title='Delete project' actionContent={translate('YES')} actionTheme='error' actionCallback={this.deleteProject.bind(this)}>
                Are you sure you want to delete the project <b>{this.state.workingProject.name}</b> ?
            </SmallModal>

            <Modal icon='folder' id='newFolderModal' title='Create new folder' actionContent={translate('CREATE')} actionCallback={this.createFolder.bind(this)} valid={this.state.workingItem.nameInvalidMessage.length > 0}>
                <Entry label='Folder name' placeholder='e.g. Sept 2018' type='text' onChange={this.itemNameChanged.bind(this)} value={this.state.workingItem.newName} isInvalid={this.state.workingItem.nameInvalidMessage.length > 0} invalidMessage={this.state.workingItem.nameInvalidMessage} />
            </Modal>

            <SmallModal icon='trash' iconTheme='danger' id='deleteItemModal' title='Delete item' actionContent={translate('YES')} actionTheme='error' actionCallback={this.deleteItem.bind(this)}>
                Are you sure you want to delete <b>{this.state.workingItem.name}</b> ?
            </SmallModal>

            <Modal icon='cog' id='projectSettingsModal' title='Project Settings' actionContent={translate('SAVE')} actionCallback={null} />

            <Modal icon='share-alt' id='shareItemModal' title='Share item' actionContent={translate('SHARE')} actionCallback={null} />

            <Modal icon='copy' id='copyItemModal' title={`Copy ${this.state.workingItem.name} to`} actionContent={translate('COPY')} actionCallback={this.copyItem.bind(this)}>
                <FoldersTree onChange={this.destinationPathChanged.bind(this)} />
            </Modal>

            <Modal icon='copy' id='moveItemModal' title={`Move ${this.state.workingItem.name} to`} actionContent={translate('MOVE')} actionCallback={this.moveItem.bind(this)}>
                <FoldersTree onChange={this.destinationPathChanged.bind(this)} />
            </Modal>

            <Modal icon='pen' id='renameItemModal' title='Rename item' actionContent={translate('RENAME')} actionCallback={this.renameItem.bind(this)} valid={this.state.workingItem.nameInvalidMessage.length > 0}>
                <Entry label='New name' placeholder='e.g. deadpool-copy.mp4' type='text' onChange={this.itemNameChanged.bind(this)} value={this.state.workingItem.newName} isInvalid={this.state.workingItem.nameInvalidMessage.length > 0} invalidMessage={this.state.workingItem.nameInvalidMessage} />
            </Modal>
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
        uploads: state.uploads,
        files: state.files,
        links: state.links
    }
}

export default connect(mapStateToProps)(Home)