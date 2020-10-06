import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import SSalesTableEntry from './SSalesTableEntry';
import { getAllSSalesDetailed, getSSalesByAppointment } from '../../Api/Api';

type tableEntryType = {
    id: number;
    appointment: any;
    service: any;
    name: string;
    salePrice: string;
    date: string;
};

type propType = { id?: number}
type stateType = { id?: number; entries: Array<tableEntryType>; };

class SsalesTable extends Component<propType, stateType>{
    constructor(props: propType){
        super(props);
        this.state = {
            id: props.id,
            entries: [],
        };
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () => {
        if(this.state.id){
            getSSalesByAppointment(this.state.id)
                .then(res => {
                     this.setState({ entries: res });
                })
                .catch(err => console.log(err));
        } else{
            getAllSSalesDetailed()
                .then(res => this.setState({ entries: res }))
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr style={{textAlign:"center"}}>
                        <th>Date</th>
                        <th>SSID</th>
                        <th>AID</th>
                        <th>SID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.entries
                            .reverse()
                            .map((entry: tableEntryType) =>
                                <SSalesTableEntry
                                    key={entry.id}
                                    id={entry.id}
                                    appointment={entry.appointment.id}
                                    service={entry.service.id}
                                    name={entry.name}
                                    salePrice={entry.salePrice}
                                    date={entry.appointment.startDate}
                                />
                            )
                    }
                </tbody>
            </Table>
        );
    }
}

export default SsalesTable