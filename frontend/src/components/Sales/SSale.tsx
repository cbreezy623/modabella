import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Table from 'react-bootstrap/Table';
import SSalesTableEntry from './Tables/SSalesTableEntry';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { deleteSSale, getCookie, getSSaleDetailed } from '../Api/Api';

interface Props extends RouteComponentProps { id: number; };

class SSale extends Component<Props,any> {
    csrftoken: string;
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id,
            ssale: {
                id: 0,
                appointment: {},
                service: {},
                name: "",
                payment: "",
                salePrice: "",
            },
        };
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    componentDidMount = () => {
        this.getSSale();
    }

    getSSale(){
        getSSaleDetailed(this.state.id)
            .then(res => {
                this.setState({ ssale: res });
            })
            .catch(err => console.log(err));
    }

    deleteSale = () => {
        deleteSSale(this.state.ssale.id, this.csrftoken)
            .then(res => {
                //console.log(res);
                window.location.href = `/appointment/${this.state.ssale.appointment.id}`;
            })
            .catch(err =>  console.log(err));
    }

    table = () => {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>SSID</th>
                        <th>AID</th>
                        <th>SID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                <SSalesTableEntry
                    key={this.state.ssale.id}
                    id={this.state.ssale.id}
                    appointment={this.state.ssale.appointment.id}
                    service={this.state.ssale.service.id}
                    name={this.state.ssale.name}
                    salePrice={this.state.ssale.salePrice}
                    date={this.state.ssale.appointment.startDate}
                />
                </tbody>
            </Table>
        );
    }

    render() {
        const divStyle = {
            padding: "1rem 0rem",
        };
        if(this.state.ssale.id === 0) return null;
        return (
            <div>
                <Link to={`/appointment/${this.state.ssale.appointment.id}`}>
                    Appointment {this.state.ssale.appointment.id}
                </Link>
                <div style={divStyle}>
                    <Button variant="danger" onClick={this.deleteSale}>Delete Sale</Button>
                </div>
                {this.table()}
            </div>
        );
    }
}

export default SSale;
