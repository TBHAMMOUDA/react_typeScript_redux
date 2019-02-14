import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos { }

export default class TableRow extends React.Component<IPropos, IState> {
    render() {
        return <tr className=''>
            {this.props.children}
        </tr>
    }
}