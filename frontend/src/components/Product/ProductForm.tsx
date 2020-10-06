import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addProduct, getAllBrands, updateProduct, getCookie } from '../Api/Api';

interface props {
    request: string;
    product: product;
}
const UNIQUE_MSG = "Make sure fields are not blank and name is unique for given brand.";
const ADD_ERR_MSG = "Error: Product could not be added to the database. " + UNIQUE_MSG;
const UDT_ERR_MSG = "Error: Product info could not be updated in the database. " + UNIQUE_MSG; 

class ProductForm extends Component<props, any> {
    csrftoken: string;
    constructor(props: props){
        super(props);
        this.state = {
            request: props.request,
            id: props.product.id,
            name: props.product.name,
            brand: props.product.brand,
            price: props.product.price,
            brands: [],
        }
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    componentDidMount() {
        this.getBrands();
    }

    product = () : product => {
        return ({
            id: this.state.id,
            name: this.state.name,
            brand: this.state.brand,
            price: this.state.price,
        });
    }

    addProduct = () => {
        addProduct(this.product(), this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err =>  {
                console.log(err);
                alert(ADD_ERR_MSG);
            });
    }

    updateProduct = () => {
        updateProduct(this.product(), this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
                alert(UDT_ERR_MSG)
            });
    }

    getBrands = () => {
        getAllBrands()
            .then(res => {
                this.setState({brands: res});
                this.setState({brand: res[0].id});
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        if(this.state.request === "post"){
            this.addProduct();
        } else if(this.state.request === "put"){
            this.updateProduct();
        }
    }

    objNameSort = (a: any, b: any) => {
        let an = a.name.toUpperCase();
        let bn = b.name.toUpperCase();
        if(an < bn) { return -1; }
        else if(an > bn) { return 1; }
        else { return 0; }
    }

    onChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    brandRow = () => {
        let arr = this.state.brands
        return (
            <Form.Row>
                <Form.Group as="select" onChange={(item:any) => {
                    let brand = item.target.value;
                    this.setState({ brand: brand });
                }}>
                    { arr.sort(this.objNameSort).map((b:any) =>
                        <option value={b.id} key={b.id}>{b.name}</option>
                    )}
                </Form.Group>
            </Form.Row>
        );
    }

    render() {
        const { name, price } = this.state;
        return(
            <Form onSubmit={ this.handleSubmit } id="productForm">
                <Form.Label>Brand</Form.Label>
                { this.brandRow() }
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter product name" name="name" value={name} onChange={this.onChange} />
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="Enter price" name="price" value={price} onChange={this.onChange} />
                <br></br>
                <Button variant="success" type="submit"> Add </Button>
            </Form>
        );
    }
}

export default ProductForm
