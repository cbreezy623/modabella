import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addCustomer, updateCustomer, getCookie } from '../Api/Api';

interface propsType {
    request: string;
    customer: Readonly<customer>;
}

interface stateType extends customer { request: string }

const REQ_FIELDS_MSG = "Make sure that all required fields are filled.";
const ADD_MSG = "Error: Could not add customer to database. " + REQ_FIELDS_MSG;
const UPDATE_MSG = "Error: Could not update customer info. " + REQ_FIELDS_MSG;

class CustomerForm extends Component<propsType, any> {
    csrftoken: string;
    constructor(props: propsType){
        super(props);
        this.state = {
            request: props.request,
            id: props.customer.id,
            first_name: props.customer.first_name,
            last_name: props.customer.last_name,
            phone: props.customer.phone,
            email: props.customer.email,
            notes: props.customer.notes,
        }
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    getData = () => {
        return ({
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            email: this.state.email,
            notes: this.state.notes,
        })
    }

    addCustomer = () => {
        addCustomer(this.getData(), this.csrftoken)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
                alert(ADD_MSG);
            });
    }

    updateCustomer() {
        updateCustomer(this.getData(), this.csrftoken)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
                alert(UPDATE_MSG)
            });
    }

    onChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        if(this.state.request === "post"){
            this.addCustomer();
        } else if(this.state.request === "put"){
            this.updateCustomer();
        }
    }

    render(){
        const { first_name, last_name, phone, email, notes } = this.state;
        return(
            <Form onSubmit={ this.handleSubmit } id="customerForm">
                <Form.Label>First Name (required)</Form.Label>
                <Form.Control
                    placeholder="Enter first name" name="first_name"
                    value={first_name} onChange={this.onChange}/>
                <Form.Label>Last Name (required)</Form.Label>
                <Form.Control placeholder="Enter last name"
                    name="last_name" value={last_name}
                    onChange={this.onChange}/>
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder="Enter phone number"
                    name="phone" value={phone} onChange={this.onChange}/>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                    name="email" value={email} onChange={this.onChange}/>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" placeholder="Enter notes"
                    name="notes" value={notes} onChange={this.onChange}/>
                <br></br>
                <Button variant="success" type="submit"> Save </Button>
            </Form>
        );
    }
}

export default CustomerForm