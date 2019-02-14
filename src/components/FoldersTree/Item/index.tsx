import * as React from 'react'

import './style.scss'
import Icon from '../../Icon'

declare var $

interface IStates { }
interface IProps {
    data: any
    selectionChanged: any
    currentSelection: string
}

export default class FoldersTreeItem extends React.Component<IProps, IStates> {
    treeSubs: any

    constructor(props) {
        super(props)

        this.treeSubs = React.createRef()
    }

    toggle() {
        $(this.treeSubs.current).collapse('toggle')
        this.props.selectionChanged(this.props.data.path)
    }

    render() {
        return <div className='folders-tree-item'>
            <div className={['folders-tree-item-container', this.props.currentSelection === this.props.data.path ? 'selected' : ''].join(' ')} onClick={this.toggle.bind(this)}>
                <Icon name='folder' style='solid' color='gray' /> {this.props.data.name}
            </div>

            <div className='folders-tree-subs collapse' ref={this.treeSubs}>
                {this.props.data.subfolders && this.props.data.subfolders.map((item, index) => <FoldersTreeItem key={index} data={item} currentSelection={this.props.currentSelection} selectionChanged={this.props.selectionChanged} />)}
            </div>
        </div>
    }
}