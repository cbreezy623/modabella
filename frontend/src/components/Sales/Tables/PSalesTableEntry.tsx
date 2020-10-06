import React, { Component } from 'react';
import moment from 'moment';
import { Route } from 'react-router-dom';

type tableEntryType = {
    id?: number;
    appointment?: number;
    product?: number;
    brand?: string;
    name?: string;
    quantity: number;
    unitSalePrice?: string;
    subtotal: string;
    unitTax?: string;
    tax: string;
    total: string;
    date?: string;
}

class PSalesTableEntry extends Component<tableEntryType, tableEntryType>{
    constructor(props: tableEntryType){
        super(props);
        this.state = {
            id: props.id,
            appointment: props.appointment,
            product: props.product,
            name: props.name,
            brand: props.brand,
            quantity: props.quantity,
            unitSalePrice: props.unitSalePrice,
            subtotal: props.subtotal,
            unitTax: props.unitTax,
            tax: props.tax,
            total: props.total,
            date: props.date,
        };
    }

    render() {
        const row = () => ( <Route render={({ history }) => (
            <tr style={{textAlign:"right"}} key={ this.state.id } onClick={ () => { history.push(`/psale/${this.state.id}`)} }>
                <td>{ moment(this.state.date).format('ll') }</td>
                <td>{ this.state.id }</td>
                <td>{ this.state.appointment }</td>
                <td>{ this.state.product }</td>
                <td>{ this.state.brand }</td>
                <td>{ this.state.name }</td>
                <td>{ this.state.quantity }</td>
                <td>{ this.state.unitSalePrice }</td>
                <td>{ this.state.unitTax }</td>
                <td>{ this.state.subtotal }</td>
                <td>{ this.state.tax }</td>
                <td>{ this.state.total }</td>
            </tr>
        )} /> );

        return row();
    }
}

export default PSalesTableEntry