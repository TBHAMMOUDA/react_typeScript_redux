import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos { }

export default class Table extends React.Component<IPropos, IState> {
    render() {
        return <table className='table'>
            {this.props.children}
        </table>
    }
}