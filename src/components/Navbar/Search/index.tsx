import * as React from 'react'

import './style.scss'
import Icon from '../../Icon';
import translate from '../../../translations';

interface IState {
    query: string
}
interface IPropos { }

export default class Search extends React.Component<IPropos, IState> {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    queryChanged(event) { this.setState({ query: event.target.value }) }

    render() {
        return <div className='search-form'>
            <input placeholder={translate('NAV_SEARCH_PLACEHOLDER')} onChange={this.queryChanged.bind(this)} value={this.state.query} readOnly />
            <Icon name='search' color='gray' className='search-icon' />
            <Icon name={this.state.query.length > 0 ? 'circle-notch' : 'angle-down'} color='gray' className={'search-arrow ' + (this.state.query.length > 0 && 'fa-spin')} />
        </div>
    }
}