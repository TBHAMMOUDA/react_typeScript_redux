import * as React from 'react'

import './style.scss'

declare var $

interface IState {
    visible: boolean
}

interface IProps {
    downloadAction: any
    clearWorkingItem: any
    target: string
}

export default class ContextMenu extends React.Component<IProps, IState> {
    container: any

    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.container = document.getElementById(this.props.target)

        try {
            this.container.addEventListener('contextmenu', this._handleContextMenu)
            this.container.addEventListener('click', this._handleClick)
            this.container.addEventListener('scroll', this._handleScroll)
        } catch (ex) { }
    }

    componentWillUnmount() {
        try {
            this.container.removeEventListener('contextmenu', this._handleContextMenu)
            this.container.removeEventListener('click', this._handleClick)
            this.container.removeEventListener('scroll', this._handleScroll)
        } catch (ex) { }
    }

    _handleContextMenu = (event) => {
        try {
            event.preventDefault()

            this.setState({ visible: true })

            const clickX = event.clientX
            const clickY = event.clientY
            const screenW = window.innerWidth
            const screenH = window.innerHeight
            const rootW = this.container.offsetWidth
            const rootH = this.container.offsetHeight

            const right = (screenW - clickX) > rootW
            const left = !right
            const top = (screenH - clickY) > rootH
            const bottom = !top

            if (right) {
                this.container.style.left = `${clickX + 0}px`
            }

            if (left) {
                this.container.style.left = `${clickX - rootW - 0}px`
            }

            if (top) {
                this.container.style.top = `${clickY + 0}px`
            }

            if (bottom) {
                this.container.style.top = `${clickY - rootH - 0}px`
            }
        } catch (ex) { }
    }

    _handleClick = (event) => {
        try {
            const { visible } = this.state
            const wasOutside = !(event.target.contains === this.container)

            if (wasOutside && visible) this.setState({ visible: false, })

            switch (event.target.attributes['data-action'].value) {
                case 'clearWorkingItem':
                    this.props.clearWorkingItem()
                    break;

                case 'downloadAction':
                    this.props.downloadAction()
                    break;
            }
        } catch (ex) { }
    }

    _handleScroll = () => {
        try {
            const { visible } = this.state
            if (visible) this.setState({ visible: false, })
        } catch (ex) { }
    }

    render() {
        const { visible } = this.state

        return (visible || null) && <div className='context-menu dropdown-menu dropdown-menu-right show' x-placement='bottom-end' ref={ref => { this.container = ref }}>
            <a className='dropdown-item' data-action='clearWorkingItem' data-target='#newFolderModal' data-toggle='modal'>New folder</a>
            <a className='dropdown-item' data-action='downloadAction'>Download all files</a>
        </div>
    }
}