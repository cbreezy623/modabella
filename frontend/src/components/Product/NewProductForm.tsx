import React, { Component } from "react";
import ProductForm from './ProductForm';

class NewProductForm extends Component<any, product> {
    constructor(props: any){
        super(props);
        this.state = {
            id: 0,
            name: "",
            price: "",
            brand: 0,
        }
    }

    render() {
        let product = this.state;
        return(
            <ProductForm
                request="post"
                product={product}
            />
        );
    }
}

export default NewProductForm