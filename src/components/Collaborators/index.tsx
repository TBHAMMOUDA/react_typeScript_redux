import * as React from 'react'

import './style.scss'

import Photo from '../Photo';
import translate from '../../translations';

interface IState { }
interface IPropos {
    content: Array<any>
}

export default class Collaborators extends React.Component<IPropos, IState> {
    render() {
        if (this.props.content.length === 0) return translate('ONLY_YOU')
        else return this.props.content.map((collaborator, index) => <Photo key={index} source={collaborator.photo} letters={collaborator.name || collaborator.email} collaborator collaboratorIndex={index} />)
    }
}