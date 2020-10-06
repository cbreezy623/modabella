import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import PSalesTableEntry from './PSalesTableEntry'
import { getAllPSalesDetailed, getPSalesByAppointment } from '../../Api/Api';

type tableEntryType = {
    id: number;
    appointment: any;
    product: any;
    name: string;
    quantity: number;
    unitSalePrice: string;
    unitTax: string;
    payment: string;
    subtotal: string;
    tax: string;
    total: string;
};

type propType = { id?: number}
type stateType = { id?: number, details: Array<tableEntryType>};

class PSalesTable extends Component<propType, stateType>{
    constructor(props: propType){
        super(props);
        this.state = {
            id: props.id,
            details: [],
        };
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () => {
        if(this.state.id){
            getPSalesByAppointment(this.state.id)
                .then(res => {
                     this.setState({ details: res });
                })
                .catch(err => console.log(err));
        } else{
            getAllPSalesDetailed()
                .then(res => this.setState({ details: res }))
                .catch(err => console.log(err));
        }
    }

    render() {
        let rows = this.state.details
            .reverse()
            .map((entry: tableEntryType) =>
                <PSalesTableEntry
                    key={entry.id}
                    id={entry.id}
                    appointment={entry.appointment.id}
                    product={entry.product.id}
                    brand={entry.product.brand.name}
                    name={entry.name}
                    quantity={entry.quantity}
                    unitSalePrice={entry.unitSalePrice}
                    subtotal={entry.subtotal}
                    unitTax={entry.unitTax}
                    tax={entry.tax}
                    total={entry.total}
                    date={entry.appointment.startDate}
                />
            );
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr style={{textAlign:"center"}}>
                        <th>Date</th>
                        <th>PSID</th>
                        <th>AID</th>
                        <th>PID</th>
                        <th>Brand</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Unit Tax</th>
                        <th>Subtotal</th>
                        <th>Tax</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </Table>
        );
    }
}

export default PSalesTable