import React from 'react';
import SaleForm from './SaleForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addPSale } from '../Api/Api';

interface prop { appointment: number }

class ProductSaleForm extends SaleForm {
    constructor(props: prop){
        super(props);
        this.state = {
            appointment: props.appointment,
            type: "product",
            sale: -1,
            group: -1,
            quantity: 1,
            price: -1,
            payment: "cash",
            brands: [],
            products: [],
        }
    }

    componentDidMount = () => {
        this.getBrands();
    }

    getItem = (id: number) => {
        return this.state.products.find((e: any) => Number(e.id) === Number(id));
    }

    getData = (item: any) => {
        return (
            {
                appointment: this.state.appointment,
                quantity: this.state.quantity,
                unitSalePrice: this.priceRef.current!.value,
                product: item.id,
                payment: this.state.payment
            }
        )
    }

    addSale = () => {
        let item = this.getItem(this.state.sale);
        if(item === undefined) return;

        let data = this.getData(item);
        addPSale(data, this.csrftoken)
            .then(() => {
                window.location.reload();
            })
            .catch(err =>  console.log(err));
    }

    render() {
        let brandRow = this.brandRow();
        let productRow = this.productRow();
        let quantityRow = this.quantityRow();
        let priceRow = this.priceRow();
        return (
            <Form onSubmit={ this.handleSubmit } id="newSaleForm">
                <div style={{padding:'1rem 1.25rem', border:'1px solid', borderColor:'#ced4da'}}>
                { brandRow }
                { productRow }
                { quantityRow }
                { priceRow }
                <br></br>
                <Button variant="success" type="submit"> Add </Button>
                </div>
            </Form>
        );
    }
}

export default ProductSaleForm
