import * as React from 'react'

import './style.scss'

interface IState { }
interface IPropos { }

export default class Switch extends React.Component<IPropos, IState> {

    render() {
        return (
            <label className='switch'>
                <input type='checkbox' checked />
                <span className='slider round'></span>
            </label>
        );
    }
}