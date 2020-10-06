import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Table from 'react-bootstrap/Table';
import PSalesTableEntry from './Tables/PSalesTableEntry';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { deletePSale, getCookie, getPSaleDetailed } from '../Api/Api';

interface Props extends RouteComponentProps { id: number; };

class PSale extends Component<Props,any> {
    csrftoken: string;
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id,
            psale: {
                id: 0,
                appointment: {},
                product: {},
                name: "",
                quantity: 0,
                unitSalePrice: "",
                unitTax: 0,
                payment: "",
                subtotal: "",
                tax: 0,
                total: 0,
            },
        };
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    componentDidMount = () => {
        this.getPSale();
    }

    getPSale(){
        getPSaleDetailed(this.state.id)
            .then(res => {
                this.setState({ psale: res });
            })
            .catch(err => console.log(err));
    }

    deleteSale = () => {
        deletePSale(this.state.psale.id, this.csrftoken)
            .then(() => {
                window.location.href = `/appointment/${this.state.psale.appointment.id}`;
            })
            .catch(err =>  console.log(err));
    }

    table = () => {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
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
                <PSalesTableEntry
                    key={this.state.psale.id}
                    id={this.state.psale.id}
                    appointment={this.state.psale.appointment.id}
                    product={this.state.psale.product.id}
                    brand={this.state.psale.product.brand.name}
                    name={this.state.psale.name}
                    quantity={this.state.psale.quantity}
                    unitSalePrice={this.state.psale.unitSalePrice}
                    subtotal={this.state.psale.subtotal}
                    unitTax={this.state.psale.unitTax}
                    tax={this.state.psale.tax}
                    total={this.state.psale.total}
                    date={this.state.psale.appointment.startDate}
                />
                </tbody>
            </Table>
        );
    }

    render() {
        const divStyle = {
            padding: "1rem 0rem",
        };
        if(!this.state.psale.id) return null;
        return (
            <div>
                <Link to={`/appointment/${this.state.psale.appointment.id}`} >
                    Appointment {this.state.psale.appointment.id}
                </Link>
                <div style={divStyle}>
                    <Button variant="danger" onClick={this.deleteSale}>Delete Sale</Button>
                </div>
                {this.table()}
            </div>
        );
    }
}

export default PSale;
