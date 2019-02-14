import * as React from 'react'

import './style.scss'
import Button from '../../Button';
import translate from '../../../translations';
import Icon from '../../Icon';

interface IState { }
interface IPropos {
    id: string
    title: string
    actionContent: string
    actionCallback: any
    actionTheme?: string
    icon: string
    iconTheme?: string
}

export default class SmallModal extends React.Component<IPropos, IState> {
    render() {
        return <div className='small-modal modal fade' id={this.props.id}>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className={['modal-icon', this.props.iconTheme].join(' ')}>
                            <Icon style='regular' name={this.props.icon} />
                        </div>

                        <h5 className='modal-title'>{this.props.title}</h5>

                        <button className='close' data-dismiss='modal'>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className='modal-body'>
                        {this.props.children}
                    </div>

                    <div className='modal-footer'>
                        {this.props.title === 'Coming Soon' && <Button size='large' content={translate('CLOSE')} theme='primary' dataDismiss='modal' action={() => { }} />}
                        {this.props.title !== 'Coming Soon' && <Button size='large' content={translate('CANCEL')} theme='outline dark' dataDismiss='modal' action={() => { }} />}
                        {this.props.title !== 'Coming Soon' && <Button size='large' content={this.props.actionContent} theme={this.props.actionTheme || 'primary'} action={this.props.actionCallback} />}
                    </div>
                </div>
            </div>
        </div>
    }
}