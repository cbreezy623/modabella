import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addModifier, updateModifier, getCookie } from "../Api/Api";

interface props {
    request: string;
    modifier: Readonly<modifier>;
}

const UNIQUE_MSG = "Make sure fields are not blank and name is unique."
const ADD_ERR_MSG = "Error: Modifier could not be added to the database. " + UNIQUE_MSG;
const UDT_ERR_MSG = "Error: Modifier info could not be updated in the database. " + UNIQUE_MSG;

class ModifierForm extends Component<props, any> {
    csrftoken: any;
    constructor(props: props){
        super(props);
        this.state = {
            request: props.request,
            id: props.modifier.id,
            name: props.modifier.name,
            price: props.modifier.price,
        }
        this.csrftoken = getCookie(document, 'csrftoken');
    }
    
    modifier = () => {
        return ({
            id: this.state.id,
            name: this.state.name,
            price: this.state.price,
        })
    }

    addModifier = () => {
        const data = {
            name: this.state.name,
            price: this.state.price,
        };
        
        addModifier(data, this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert(ADD_ERR_MSG);
            });
    }

    updateModifier = () => {
        updateModifier(this.modifier(), this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert(UDT_ERR_MSG);
            })
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        if(this.state.request === "put"){
            this.updateModifier();
        } else if(this.state.request === "post"){
            this.addModifier();
        }
    }

    onChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { name, price } = this.state;
        return(
            <Form onSubmit={ this.handleSubmit } id="newModifierForm">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter modifier name" name="name" value={name} onChange={this.onChange} />
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="Enter price" name="price" value={price} onChange={this.onChange} />
                <br></br>
                <Button variant="success" type="submit"> Save </Button>
            </Form>
        );
    }
}

export default ModifierForm