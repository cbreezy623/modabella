import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { getAllBrands, getAllCategories, getCookie, getProductsByBrand, getServiceByCategory, getServModsByService } from '../Api/Api';

class SaleForm extends Component<any,any> {
    priceRef: React.RefObject<HTMLInputElement>;
    csrftoken: string;
    constructor(props:any){
        super(props);
        this.state = {
            appointment: props.appointment,
            type: props.type,
            sale: -1,
            group: -1,
            quantity: 1,
            price: -1,
            payment: "cash",
            categories: [],
            brands: [],
            services: [],
            servmods: [],
            products: [],
            modPrices: [],
            checked: [],
        }
        this.priceRef = React.createRef();
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    getItem = (saleId : number) : any => {}

    addSale = () => {}

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.addSale();
    }

    handleNewServices = (group: number) => {
        return ((res: any) => {
            if(res[0]){
                this.setState({ sale: res[0].id, services: res, group: group });
                this.getServMods(res[0].id);
                this.priceRef.current!.value = res[0].price;
            } else {
                this.setState({ services: res, group: group });
            }
        });
    }

    getServices = (category: number) => {
        getServiceByCategory(category)
            .then(this.handleNewServices(category))
            .catch(err => console.log(err));
    }

    handleNewServMods = (id: number) => {
        let prices: any[] = [];
        let checked: boolean[] = [];
        return ((res: any) => {
            res.forEach((servmod: any) => {
                prices.push(parseFloat(servmod.modifier.price));
                checked.push(false);
            });
            this.setState({ modPrices: prices, checked: checked, servmods: res, saleId: id});
        });
    }

    getServMods = (id: number) => {
        getServModsByService(id)
            .then(this.handleNewServMods(id))
            .catch(err => console.log(err));
    }

    handleNewProducts = (res: any) => {
        if(res[0]){
            this.setState({ sale: res[0].id, products: res });
            this.priceRef.current!.value = res[0].price;
        } else {
            this.setState({ products: res });
        }
    }

    getProducts = (brand: number) => {
        getProductsByBrand(brand)
            .then(this.handleNewProducts)
            .catch(err => console.log(err));
    }

    handleCategories = (res: any) => {
        if(res[0] === undefined) return;
        this.setState({ categories: res, group: res[0].id });
        this.getServices(res[0].id);
    }

    getCategories = () => {
        getAllCategories()
            .then(this.handleCategories)
            .catch(err => console.log(err));
    }

    handleBrands = (res: any) => {
        if(res[0] === undefined) return;
        this.setState({ brands: res, group: res[0].id });
        this.getProducts(res[0].id);
    }

    getBrands = () => {
        getAllBrands()
            .then(this.handleBrands)
            .catch(err => console.log(err));
    }

    handleChecked = (checked: boolean[], index: number) => {
        let oldVal = parseFloat(this.priceRef.current!.value);
        let change = this.state.modPrices[index];
        change *= checked[index] ? 1 : -1;
        let newVal = (oldVal + change).toFixed(2);
        this.priceRef.current!.value = newVal;
    }

    brandRow = () => {
        let brands = this.state.brands;
        return (
            <div>
                <Form.Label>Brand</Form.Label>
                <Form.Row>
                    <Form.Group as="select" onChange={(brand:any) => {
                        let group = brand.target.value;
                        this.setState({ group: group });
                        this.getProducts(group);
                    }}>
                        { brands.map((brand: any) =>{
                            return (
                                <option value={brand.id} key={ brand.id }>{brand.name}</option>
                            );
                        })}
                    </Form.Group>
                </Form.Row>
            </div>
        )
    }

    categoryRow = () => {
        let categories = this.state.categories;
        return (
            <div>
                <Form.Label>Category</Form.Label>
                <Form.Row>
                    <Form.Group as="select" onChange={(category:any) => {
                        let group = category.target.value;
                        this.getServices(group);
                    }}>
                        { categories.map((category:any) => {
                            return (
                                <option value={category.id} key={ category.id }>{category.name}</option>
                            );
                        })}
                    </Form.Group>
                </Form.Row>
            </div>
        );
    }

    onChangeSale = (item: any) => {
        let id = item.target.value;
        this.priceRef.current!.value = this.getItem(id).price;
        this.setState({ sale: id })
        console.log(id);
        if(this.state.type === 'service') {
            this.getServMods(id);
        }
    }

    saleOption = (item: any) => {
        return (
            <option value={item.id} key={ item.id }>{item.name}</option>
        );
    }

    itemRow = (items: any[]) => {
        return (
            <Form.Row>
                <Form.Group as="select" onChange={ this.onChangeSale }>
                    { items.map(this.saleOption) }
                </Form.Group>
            </Form.Row>
        );
    }

    productRow = () => {
        let products = this.state.products;
        return (
            <div>
                <Form.Label>Product</Form.Label>
                { this.itemRow(products) }
            </div>
        );
    }

    serviceRow = () => {
        let services = this.state.services;
        return (
            <div>
                <Form.Label>Service</Form.Label>
                { this.itemRow(services) }
            </div>
        );
    }

    modifierRow = () => {
        let row = (
            <Form.Group>
                {this.state.servmods.map((servmod: any, index: number) => {
                    return (<Form.Check
                        type={'checkbox'}
                        label={servmod.modifier.name + " -> " + servmod.modifier.price}
                        checked={
                            this.state.checked[index] // this keeps checkbox and checked value the same
                        }
                        onChange={ () => {
                            let checked = this.state.checked;
                            checked[index] = !checked[index];
                            this.setState({ checked: checked });
                            this.handleChecked(checked, index);
                        }}
                    />);
                })}
            </Form.Group>
        );
        return row;
    }

    quantityRow = () : JSX.Element => {
        let row = (
            <Form.Row>
                <Form.Group onChange={(quantity: any) => {
                    this.setState({ quantity: quantity.target.value });
                }}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" min="1" defaultValue="1"/>
                </Form.Group>
            </Form.Row>
        )
        return row;
    }

    priceRow = () => {
        let row = (
            <Form.Row>
                <Form.Group onChange={(price: any) => {
                    this.setState({ price: price.target.value });
                }}>
                    <Form.Label>Unit Price</Form.Label>
                    <Form.Control type="text" ref={this.priceRef} defaultValue={0}/>
                </Form.Group>
            </Form.Row>
        );
        return row;
    }

    paymentRow = () => {
        return (
            <Form.Row>
                <Form.Group as="select" onChange={(payment: any) => {
                    this.setState({ payment: payment.target.value })
                }}>
                    <Form.Label>Payment Type</Form.Label>
                    <option value="cash">Cash</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="check">Check</option>
                    <option value="split">Split</option>
                </Form.Group>
            </Form.Row>
        );
    }
}

export default SaleForm
