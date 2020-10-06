import React from 'react';
import SaleForm from './SaleForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addSSale } from '../Api/Api';

interface prop { appointment: number }

class ServiceSaleForm extends SaleForm {
    constructor(props: prop){
        super(props);
        this.state = {
            appointment: props.appointment,
            type: "service",
            sale: -1,
            group: -1,
            price: -1,
            payment: "cash",
            categories: [],
            services: [],
            servmods: [],
            modPrices: [],
            checked: [],
        }
    }

    componentDidMount = () => {
        this.getCategories();
    }

    getItem = (id: number) => {
        return this.state.services.find((e: any) => Number(e.id) === Number(id));
    }

    getData = (item: any) => {
        return (
            {
                appointment: this.state.appointment,
                salePrice: this.priceRef.current!.value,
                service: item.id,
                payment: this.state.payment
            }
        )
    }

    addSale = () => {
        let item = this.getItem(this.state.sale);
        let data = this.getData(item);
        addSSale(data, this.csrftoken)
            .then(res => {
                window.location.reload();
            })
            .catch(err =>  console.log(err));
    }

    render() {
        let categoryRow = this.categoryRow();
        let serviceRow = this.serviceRow();
        let priceRow = this.priceRow();
        let modifierRow = this.modifierRow();
        return (
            <Form onSubmit={ this.handleSubmit } id="newSaleForm">
                <div style={{padding:'1rem 1.25rem', border:'1px solid', borderColor:'#ced4da'}}>
                { categoryRow }
                { serviceRow }
                { modifierRow }
                { priceRow }
                <br></br>
                <Button variant="success" type="submit"> Add </Button>
                </div>
            </Form>
        );
    }
}

export default ServiceSaleForm
