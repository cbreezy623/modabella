import React, { Component } from 'react';
import CustomerCardList from '../Customer/CustomerCardList'
import AddAccordion from '../Shared/AddAccordion';
import NewCustomerForm from '../Customer/NewCustomerForm';

class Customers extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Customers</h1>
                <AddAccordion text='Add Customer' form={<NewCustomerForm />} />
                <CustomerCardList />
            </div>
        );
    }
}

export default Customers