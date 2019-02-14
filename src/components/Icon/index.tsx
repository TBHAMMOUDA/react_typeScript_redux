import * as React from 'react'

import './style.scss'

interface IPropos {
    name: string
    style?: string
    color?: string
    className?: string
}

export default class Icon extends React.Component<IPropos, {}> {
    getStyle(style) {
        switch (style) {
            case 'solid': return 'fas'
            case 'regular': return 'far'
            case 'brand': return 'fab'

            case 'light':
            default: return 'fal'
        }
    }

    render() {
        return <i className={['icon', this.getStyle(this.props.style), 'fa-' + this.props.name, 'text-' + this.props.color, this.props.className].join(' ')} />
    }
}