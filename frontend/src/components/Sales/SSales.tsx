import React, { Component } from 'react';
import SSalesTable from './Tables/SSalesTable'

class SSales extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
  
    render() {
        return (
            <SSalesTable />
        );
    }
}

export default SSales;