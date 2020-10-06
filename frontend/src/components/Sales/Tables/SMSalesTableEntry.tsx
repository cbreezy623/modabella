import React, { Component } from 'react';

type tableEntryType = {
    id: number;
    service_sale: number;
    modifier: number;
}

class SMSalesTableEntry extends Component<tableEntryType, tableEntryType>{
    constructor(props: tableEntryType){
        super(props);
        this.state = {
            id: props.id,
            service_sale: props.service_sale,
            modifier: props.modifier,
        };
    }

    render() {
        return (
            <tr key={ this.state.id } >
                <td>{ this.state.id }</td>
                <td>{ this.state.service_sale }</td>
                <td>{ this.state.modifier }</td>
            </tr>
        );
    }
}

export default SMSalesTableEntry