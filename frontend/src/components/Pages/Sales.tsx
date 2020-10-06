import React, { Component } from 'react';
import SalesTabs from '../Sales/SalesTabs';

class Sales extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Sales</h1>

                <SalesTabs />
            </div>
        );
    }
}

export default Sales;
