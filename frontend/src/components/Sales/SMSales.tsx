import React, { Component } from 'react';
import SMSalesTable from './Tables/SMSalesTable'

class SMSales extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
  
    render() {
        return (
            <SMSalesTable />
        );
    }
}

export default SMSales;