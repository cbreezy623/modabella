import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addService, updateService, getAllCategories, getCookie } from '../Api/Api';

interface propsType {
    request: string;
    service: Readonly<service>;
}

const UNIQUE_MSG = "Make sure fields are not blank and name is unique for given brand.";
const ADD_ERR_MSG = "Error: Service could not be added to the database. " + UNIQUE_MSG;
const UDT_ERR_MSG = "Error: Service info could not be updated in the database. " + UNIQUE_MSG; 

class ServiceForm extends Component<propsType, any> {
    csrftoken: string;
    constructor(props: propsType){
        super(props);
        this.state = {
            request: props.request,
            id: props.service.id,
            name: props.service.name,
            price: props.service.price,
            category: props.service.category,
            categories: [],
        }
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    componentDidMount() {
        this.getCategories();
    }

    service = () => {
        return ({
            id: this.state.id,
            name: this.state.name,
            price: this.state.price,
            category: this.state.category,
        });
    }

    addService = () => {
        addService(this.service(), this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert(ADD_ERR_MSG);
            });
    }

    updateService = () => {
        updateService(this.service(), this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert(UDT_ERR_MSG);
            });
    }

    getCategories = () => {
        getAllCategories()
            .then(res => {
                if(res[0] !== undefined) {
                    this.setState({ categories: res, category: res[0].id });
                } else {
                    this.setState({ categories: res });
                }
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        if(this.state.request === "post"){
            this.addService();
        } else if(this.state.request === "put"){
            this.updateService();
        }
    }

    onChangeCategory = (item: any) => {
        let category = item.target.value;
        this.setState({ category: category });
    }

    objNameSort = (a: any, b: any) => {
        let an = a.name.toUpperCase();
        let bn = b.name.toUpperCase();
        if(an < bn) { return -1; }
        else if(an > bn) { return 1; }
        else { return 0; }
    }

    categoryRow = () => {
        let categories = this.state.categories
        return (
            <Form.Row>
                <Form.Group as="select" onChange={ this.onChangeCategory }>
                    { categories.sort(this.objNameSort).map((c:any) =>
                        <option value={ c.id } key={ c.id }>{ c.name }</option>
                    )}
                </Form.Group>
            </Form.Row>
        );
    }

    onChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { name, price } = this.service();
        return(
            <Form onSubmit={ this.handleSubmit } id="ServiceForm">
                <Form.Label>Category</Form.Label>
                {this.categoryRow()}
                <Form.Label>Name</Form.Label>
                <Form.Control
                    placeholder="Enter service name"
                    name="name" value={ name }
                    onChange={ this.onChange }
                />
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="Enter price" name="price" value={ price } onChange={ this.onChange } />
                <br></br>
                <Button variant="success" type="submit"> Save </Button>
            </Form>
        );
    }
}

export default ServiceForm
