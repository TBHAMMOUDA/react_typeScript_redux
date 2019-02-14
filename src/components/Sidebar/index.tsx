import * as React from 'react'

import './style.scss'

import Icon from '../Icon';
import translate from '../../translations';
import SidebarItem from './Item';

declare var $;

interface IState {
    showMore: boolean
}

interface IPropos {
    failed: boolean
    activeItem: string
    itemDeleteAction: any
    newProjectHandler: any
    itemAction: any
    items: Array<any>
    loadingState: boolean
}

export default class Sidebar extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)

        this.state = {
            showMore: false
        }
    }

    toggleView() { this.setState({ showMore: !this.state.showMore }) }

    render() {
        const items = this.props.items.filter(file => file.type === 'dir' && file.name !== 'recycle_bin' && file.name !== 'uploader')

        return <div className='sidebar'>
            <div className='sidebar-header'>
                {translate('MY_PROJECTS')}

                <span onClick={this.props.newProjectHandler}>
                    <Icon name='plus' color='primary' />
                </span>
            </div>

            <ul>
                {this.props.loadingState && [0, 1, 2, 3, 4].map((item, index) => <SidebarItem key={index} content='' action={null} deleteAction={null} loading />)}
                {!this.props.loadingState && items.slice(0, (this.state.showMore ? items.length : 10)).map((file) =>
                    <SidebarItem key={file.path} content={file.name} action={() => { this.props.itemAction(file.name) }} deleteAction={() => { this.props.itemDeleteAction(file.name) }} active={this.props.activeItem === file.name} />
                )}

                {items.length > 10 && !this.state.showMore && <li className='show-more'>
                    <span onClick={this.toggleView.bind(this)}>{translate('MORE_PROJECTS')}</span>
                </li>}
                {items.length > 10 && this.state.showMore && <li className='show-more'>
                    <span onClick={this.toggleView.bind(this)}>{translate('LESS_PROJECTS')}</span>
                </li>}
            </ul>

            {this.props.failed && <div className='failed'>
                {translate('FAILED_LOAD_PROJECTS')}
            </div>}

            <div className={['sidebar-footer', (this.state.showMore ? 'sidebar-footer-shadow' : '')].join(' ')}>
                <button className={['sidebar-btn', 'uploader', (this.props.activeItem === 'uploader' && 'active')].join(' ')} onClick={() => { this.props.itemAction('uploader') }}>
                    <Icon name='download' /> {translate('UPLOADER')}
                </button>

                <button className={['sidebar-btn', 'uploader', (this.props.activeItem === 'recycle_bin' && 'active')].join(' ')} onClick={() => { this.props.itemAction('recycle_bin') }}>
                    <Icon name='trash' /> {translate('RECYCLE_BIN')}
                </button>
            </div>
        </div>
    }
}