import React, { Component } from "react";
import ProductForm from './ProductForm';

interface props {
    product: product;
}

class UpdateProductForm extends Component<props, product> {
    constructor(props: props){
        super(props);
        this.state = {
            id: props.product.id,
            name: props.product.name,
            price: props.product.price,
            brand: props.product.brand,
        }
    }

    render() {
        let product = this.state;
        return(
            <ProductForm
                request="put"
                product={product}
            />
        );
    }
}

export default UpdateProductForm