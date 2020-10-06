import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addCategory, getCookie } from '../Api/Api';

const ERR_MSG = "Error: Category could not be added to the database. Make sure field is not blank or a duplicated entry.";

class NewCategoryForm extends Component<any, any> {
    csrftoken: string;
    constructor(props: any){
        super(props);
        this.state = {
            name: "",
        }
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    addCategory() {
        let category = { name: this.state.name };
        addCategory(category, this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err =>  {
                console.log(err);
                alert(ERR_MSG);
            });
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.addCategory();
    }

    onChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { name } = this.state;
        return(
            <Form onSubmit={ this.handleSubmit } id="newCategoryForm">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter category name" name="name" value={name} onChange={this.onChange} />
                <br></br>
                <Button variant="success" type="submit"> Save </Button>
            </Form>
        );
    }
}

export default NewCategoryForm
