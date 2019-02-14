import * as React from 'react'

import FileService from '../../services/files'

import './style.scss'
import FoldersTreeItem from './Item';
import Notification from '../../services/notification';

interface IStates {
    tree: any
    loading: boolean
    success: boolean
    seleciton: string
}
interface IProps {
    onChange: any
}

export default class FoldersTree extends React.Component<IProps, IStates> {
    constructor(props) {
        super(props)

        this.state = {
            tree: [],
            loading: false,
            success: false,
            seleciton: ''
        }
    }

    componentDidMount() {
        this.load()
    }

    selectionChanged(value) {
        const email = localStorage.getItem('rushtera_user_email')
        const path = value.substr(email.length + value.indexOf(localStorage.getItem('rushtera_user_email')))
        this.setState({ seleciton: value })
        this.props.onChange(path)
    }

    async load() {
        try {
            this.setState({ loading: true, seleciton: '' })
            let result = await FileService.Tree()
            this.setState({ tree: result.data, success: true })
        } catch (ex) {
            this.setState({ success: false })
            new Notification('Cannot load content to destination folder picker')
        } finally {
            this.setState({ loading: false })
        }
    }

    render() {
        return <div className='folders-tree'>
            <p>Select destination folder</p>

            <div className='folders'>
                {this.state.loading && <p className='vertical-middle text-center'>Please wait...</p>}
                {!this.state.loading && this.state.success && this.state.tree.filter(item => item.name !== 'recycle_bin' && item.name !== 'uploader').map((item, index) => <FoldersTreeItem key={index} data={item} currentSelection={this.state.seleciton} selectionChanged={this.selectionChanged.bind(this)} />)}
                {!this.state.loading && !this.state.success && <p className='vertical-middle text-center'>Error occured.</p>}
            </div>
        </div>
    }
}