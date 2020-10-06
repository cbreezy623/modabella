import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addBrand, getCookie } from '../Api/Api';

const ERR_MSG = "Error: could not add brand to the database. Make sure field is not blank or a duplicate entry."

class NewBrandForm extends Component<any, any> {
    csrftoken: string;
    constructor(props: any){
        super(props);
        this.state = {
            name: "",
        };
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    addBrand() {
        let brand = { name: this.state.name }
        addBrand(brand, this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err =>  {
                console.log(err)
                alert(ERR_MSG);
            });
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.addBrand();
    }

    onChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { name } = this.state;
        return(
            <Form onSubmit={ this.handleSubmit } id="newBrandForm">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter brand name" name="name" value={name} onChange={this.onChange} />
                <br></br>
                <Button variant="success" type="submit"> Add </Button>
            </Form>
        );
    }
}

export default NewBrandForm
