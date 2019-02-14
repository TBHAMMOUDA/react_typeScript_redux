import * as React from 'react'

import './style.scss'
import TableRow from '..'
import TableColumn from '../../Column'
import Dropdown from '../../../Dropdown'
import DropdownItem from '../../../Dropdown/Item'
import translate from '../../../../translations'

interface IState { }
interface IPropos {
    name: string
    views: string
    active: boolean
    password: string
    expiration: string
}

export default class LinkRow extends React.Component<IPropos, IState> {
    render() {
        return <TableRow>
            <TableColumn type='image' content='https://luminous-landscape.com/wp-content/uploads/2008/08/Colin00009.jpg' />
            <TableColumn type='text' content={this.props.name} />
            <TableColumn type='text' content={this.props.views} />
            <TableColumn type='text'>
                {/* this.props.active */}
            </TableColumn>
            <TableColumn type='text' content={this.props.password} />
            <TableColumn type='text' content={this.props.expiration} />

            <TableColumn align='right'>
                <Dropdown>
                    <DropdownItem content={translate('SETTINGS')} />
                    <DropdownItem content={translate('DUPLICATE_LINK')} />
                    <DropdownItem content={translate('DELETE_LINK')} />
                </Dropdown>
            </TableColumn>
        </TableRow>
    }
}