import * as React from 'react'

import './style.scss'

declare var $

interface IState { }
interface IPropos {
    size?: string
    source: string
    collaborator?: boolean
    collaboratorIndex?: number
    letters?: string
}

export default class Photo extends React.Component<IPropos, IState> {
    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip()
    }

    randomColor() {
        const colors = ['crimson', 'red', 'blue', 'gold']
        return colors[0]
        // return colors[Math.random() * colors.length >> 0]
    }

    render() {
        if (this.props.letters && this.props.source === 'http://api.rushtera.com/public/img/userpic.png' || this.props.source === undefined) {
            return <div className={['photo-box', this.props.size].join(' ')}>
                <div className={['photo-box-content', (this.props.collaborator ? 'collaborator' : '')].join(' ')} style={{ background: this.randomColor() }} data-toggle='tooltip' data-placement='bottom' title={this.props.letters}>
                    {this.props.letters.substr(0, 2).toUpperCase()}
                </div>
            </div>
        } else {
            return <img className={['photo', (this.props.collaborator ? 'collaborator' : ''), this.props.size].join(' ')} style={{ left: '-' + ((this.props.collaboratorIndex) * 5) + 'px' }} src={this.props.source} data-toggle='tooltip' data-placement='bottom' title={this.props.letters} />
        }
    }
}