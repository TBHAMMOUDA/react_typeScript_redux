import * as React from 'react'

import './style.scss'
import Icon from '../../Icon';
// import ToggleSwitch from '/home/onessidhom/front/rushtera_front/src/components/Toggle'

interface IState { }
interface IPropos {
    type?: string
    align?: string
    content?: string
    path?: string
    icon?: string
}

export default class TableColumn extends React.Component<IPropos, IState> {
    render() {
        const { type, content, children } = this.props
        return <td className={[(this.props.align ? 'text-' + this.props.align : '')].join(' ')}>
            {
                (type === 'text' && content) ||
                (type === 'image' && <img src={content} />) ||
                (type === 'image-folder' && <div className='image-box-folder'><div className='image-box-folder-header'></div><div className='image-box'>{content}</div></div>) ||
                (type === 'image-icon' && <div className='image-box'><Icon name={content} /></div>) ||
                (type === 'loading' && <div className='loading'> <div className='placeholder'></div> </div>) ||
                (type === 'loading-image' && <div className='loading'> <div className='image placeholder'></div> </div>) ||
                children
            }
        </td>
    }
}