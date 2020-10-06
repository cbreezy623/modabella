import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { getProduct } from '../Api/Api';
import AddAccordion from '../Shared/AddAccordion';
import UpdateProductForm from './UpdateProductForm';

interface Props extends RouteComponentProps { id: number; };

const EMPTY_BRAND = {
    id: 0,
    name: "",
}

const EMPTY_PRODUCT = {
    id: 0,
    name: "",
    brand: EMPTY_BRAND,
    price: ""
}

class Product extends Component<Props,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id,
            product: EMPTY_PRODUCT,
            loaded: false,
        };
    }

    product = () => {
        let { id, name, brand, price } = this.state.product;
        return ({
            id: id,
            name: name,
            brand: brand.id,
            price: price,
        });
    }

    getProduct = () => {
        getProduct(this.state.id)
            .then(res => {
                this.setState({ product: res, loaded: true });
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getProduct();
    }

    render() {
        if(!this.state.loaded) { return null; }

        let { product } = this.state;
        let { brand, name, price } = product;
        let f = <UpdateProductForm product={ this.product() }/>
        let a = <AddAccordion text="Edit" form={f}/>
        return (
            <div>
                <h1>{ brand.name } - { name }</h1>
                <h3>${ price }</h3>
                { a }
            </div>
        );
    }
}

export default Product