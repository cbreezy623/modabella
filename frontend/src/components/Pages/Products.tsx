import React, { Component } from 'react'
import ProductCardList from '../Product/ProductCardList';
import AddAccordion from '../Shared/AddAccordion';
import NewProductFrom from '../Product/NewProductForm';
import BrandCardList from '../Product/BrandCardList';
import NewBrandForm from '../Product/NewBrandForm';

class Products extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
  
    render() {
        return (
            <div>
                <h1>Brands</h1>
                <AddAccordion text='Add Brand' form={<NewBrandForm />} />
                <BrandCardList />
                <h1>Products</h1>
                <AddAccordion text='Add Product' form={<NewProductFrom />} />
                <ProductCardList />
            </div>
        );
    }
}

export default Products;