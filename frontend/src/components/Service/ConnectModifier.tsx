import React, { Component } from 'react';
import ConnectModifierForm from './ConnectModifierForm';
import AddAccordion from '../Shared/AddAccordion';

interface PropsType { id: number };

class ConnectModifier extends Component<PropsType,any> {
    constructor(props: PropsType){
        super(props);
        this.state = {
            id: props.id
        };
    }

    render() {
        let form = <ConnectModifierForm id={this.state.id}/>;
        return (
            <AddAccordion text={"Connect Modifier"} form={form}/>
        );
    }
}

export default ConnectModifier