import React, { Component } from 'react';
import PSalesTable from './Tables/PSalesTable'

class PSales extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
  
    render() {
        return (
            <PSalesTable />
        );
    }
}

export default PSales;