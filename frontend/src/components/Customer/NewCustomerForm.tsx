import React, { Component } from "react";
import CustomerForm from './CustomerForm';

class NewCustomerForm extends Component<any, customer> {
    constructor(props: any){
        super(props);
        this.state = {
            id: 0,
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            notes: "",
        }
    }

    render() {
        let customer = this.state;
        return(
            <CustomerForm
                request="post"
                customer={customer}
            />
        );
    }
}

export default NewCustomerForm