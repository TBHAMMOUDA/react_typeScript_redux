import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos { }

export default class DropdownSeparator extends React.Component<IPropos, IState> {
    render() {
        return <div className='dropdown-divider'></div>
    }
}