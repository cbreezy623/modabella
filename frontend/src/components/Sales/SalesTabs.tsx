import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PSales from './PSales';
import SSales from './SSales';
import SMSales from './SMSales';

class SalesTabs extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
  
    render() {
        return (
            <Tabs defaultActiveKey="psales" id="sales-tabs" transition={false}>
                <Tab eventKey="psales" title="Products">
                    <PSales />
                </Tab>
                <Tab eventKey="ssales" title="Services">
                    <SSales />
                </Tab>
                <Tab eventKey="smsales" title="Modifiers">
                    <SMSales />
                </Tab>
            </Tabs>
        );
    }
}

export default SalesTabs;