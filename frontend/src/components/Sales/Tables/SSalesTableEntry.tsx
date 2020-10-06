import React, { Component } from 'react';
import moment from 'moment';
import { Route } from 'react-router-dom';

type tableEntryType = {
    id: number;
    appointment: number;
    service: number;
    name: string;
    salePrice: string;
    date: string
}

class SsalesTableEntry extends Component<tableEntryType, tableEntryType>{
    constructor(props: tableEntryType){
        super(props);
        this.state = {
            id: props.id,
            appointment: props.appointment,
            service: props.service,
            name: props.name,
            salePrice: props.salePrice,
            date: props.date,
        };
    }

    render() {
        const row = () => ( <Route render={({ history }) => (
            <tr style={{textAlign:"right"}} key={ this.state.id } onClick={ () => { history.push(`/ssale/${this.state.id}`)} }>
                <td>{ moment(this.state.date).format('ll') }</td>
                <td>{ this.state.id }</td>
                <td>{ this.state.appointment }</td>
                <td>{ this.state.service }</td>
                <td>{ this.state.name }</td>
                <td>{ this.state.salePrice }</td>
            </tr>
        )} /> );

        return row();
    }
}

export default SsalesTableEntry