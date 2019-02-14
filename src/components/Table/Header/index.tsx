import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos {
    items: Array<string>
}

export default class TableHeader extends React.Component<IPropos, IState> {
    render() {
        return <thead>
            <tr>
                {this.props.items.map((item, index) => <th key={index} {...index === 0 && { style: { width: '80px' } }} {...index === 1 && { style: { width: '500px' } }}>{item}</th>)}
            </tr>
        </thead>
    }
}