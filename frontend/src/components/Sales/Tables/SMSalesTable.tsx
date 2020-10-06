import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import SMSalesTableEntry from './SMSalesTableEntry'
import { getAllSMSales } from '../../Api/Api';

type tableEntryType = {
    id: number;
    service_sale: number;
    modifier: number;
};

type propType = { id?: number}
type stateType = { id?: number; entries: Array<tableEntryType>; };

class SMSalesTable extends Component<propType, stateType>{
    constructor(props: propType){
        super(props);
        this.state = {
            entries: [],
        };
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () => {
        getAllSMSales()
            .then(res => this.setState({ entries: res }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>SM Sale ID</th>
                        <th>Service Sale ID</th>
                        <th>Modifier ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.entries
                            .filter(e => this.state.id ? e.id === this.state.id : true)
                            .reverse()
                            .map((entry: tableEntryType) =>
                                <SMSalesTableEntry
                                    key={entry.id}
                                    id={entry.id}
                                    service_sale={entry.service_sale}
                                    modifier={entry.modifier}
                                />
                            )
                    }
                </tbody>
            </Table>
        );
    }
}

export default SMSalesTable