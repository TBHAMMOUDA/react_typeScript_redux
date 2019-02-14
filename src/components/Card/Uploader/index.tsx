import * as React from 'react'
import * as Moment from 'moment'

import FileService from '../../../services/files'

import './style.scss'

import Icon from '../../Icon'
import TableColumn from '../../Table/Column';

declare var $

interface IState {
}

interface IPropos {
    progress: number
    speed: number
    timeLeft: number
    path: string
    title: string
    row?: boolean
}

export default class CardUploader extends React.Component<IPropos, IState> {
    canvas: any

    constructor(props) {
        super(props)

        this.canvas = React.createRef()
    }

    componentDidMount() {
        this.updateProgress(this.props.progress)
    }

    componentDidUpdate() {
        this.updateProgress(this.props.progress)
    }

    convertFileSize(size) {
        const units = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s']
        let conversions = 0

        while (size > 1024) {
            size = size / 1024
            conversions++
        }

        return `${Math.trunc(size)} ${units[conversions]}`
    }

    updateProgress(progress) {
        let canvas: any = this.canvas.current
        let context: CanvasRenderingContext2D = canvas.getContext('2d')
        let centerY = canvas.height / 2
        let centerX = canvas.width / 2

        let radius = this.props.row ? 18 : 40;
        let per = (progress / 100) * 1.25

        context.clearRect(0, 0, canvas.width, canvas.height)

        context.beginPath()
        context.arc(centerX, centerY, radius, 0, 1.25 * Math.PI, false)
        context.lineWidth = 4
        context.lineCap = 'round'
        context.strokeStyle = 'silver'
        context.stroke()
        context.closePath()

        context.beginPath()
        context.arc(centerX, centerY, radius, 0, per * Math.PI, false)
        context.lineWidth = 4
        context.lineCap = 'round'
        context.strokeStyle = '#025CDF'
        context.stroke()
        context.closePath()
    }

    render() {
        if (this.props.row) {
            return <tr>
                <td>
                    <div className='uploader-progress'>
                        <div className='uploader-progress-value'>{this.props.progress}%</div>
                        <canvas ref={this.canvas} className='uploader-progress-canvas' height='40' width='60' />
                    </div>
                </td>
                <TableColumn type='text' content={this.props.title} />
                <TableColumn type='text' content={this.convertFileSize(this.props.speed)} />
                <TableColumn type='text' content={this.props.timeLeft < 60 ? this.props.timeLeft + ' seconds' : Moment().add(this.props.timeLeft, 'seconds').endOf('second').fromNow()} />
                <TableColumn type='text' content='' />
                <TableColumn type='text' content='' />

                <TableColumn align='right' />
            </tr>
        } else {
            return <div className={['card', 'card-uploader'].join(' ')}>
                <div className='uploader-progress'>
                    <div className='uploader-progress-value'>{this.props.progress} %</div>
                    <canvas ref={this.canvas} className='uploader-progress-canvas' height='100' width='100' />
                </div>

                <div className='uploader-data'>
                    <div className='uploader-title'>{this.props.title}</div>
                    <div className='uploader-details'>
                        {this.convertFileSize(this.props.speed)} <Icon style='solid' name='circle' /> {this.props.timeLeft < 60 ? this.props.timeLeft + ' seconds' : Moment().add(this.props.timeLeft, 'seconds').endOf('second').fromNow()}
                    </div>
                </div>
            </div>
        }
    }
}