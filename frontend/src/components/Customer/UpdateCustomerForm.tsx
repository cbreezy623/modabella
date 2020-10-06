import React, { Component } from "react";
import CustomerForm from './CustomerForm';

type propType = {
    customer: customer;
}

class UpdateCustomerForm extends Component<any, any> {
    constructor(props: propType){
        super(props);
        this.state = {
            id: props.customer.id,
            first_name: props.customer.first_name,
            last_name: props.customer.last_name,
            phone: props.customer.phone,
            email: props.customer.email,
            notes: props.customer.notes,
        }
    }

    render() {
        const customer = this.state;
        return(
            <CustomerForm
                request="put"
                customer={customer}
            />
        );
    }
}

export default UpdateCustomerForm