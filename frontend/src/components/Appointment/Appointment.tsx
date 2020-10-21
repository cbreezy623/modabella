import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { getAppointmentDetails, getAppointmentPSales, getAppointmentSSales, getAppointmentTotals } from '../Api/Api';
import ServiceSaleForm from './ServiceSaleForm';
import ProductSaleForm from './ProductSaleForm';
import AddAccordion from '../Shared/AddAccordion';
import PSalesTable from '../Sales/Tables/PSalesTable';
import SSalesTable from '../Sales/Tables/SSalesTable';
import SelectPaymentForm from './SelectPaymentForm';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const TAX_RATE = 0.055;

interface Props extends RouteComponentProps { id: number; };

class Appointment extends Component<Props,any>{
    constructor(props: any){
        super(props);
        this.state = {
            appointment: {
                id: props.match.params.id,
            },
            services: [],
            products: [],
            loaded: false,
            p_subtotal: 0,
            s_subtotal: 0,
            subtotal: 0,
            tax: 0,
            total: 0,
            totals: undefined,
            post: false,
        };
    }

    componentDidMount(){
        this.loadData();
    }

    defaultPayment = (totals: any) : string => {
        const cash = Number(totals.cash);
        const card = Number(totals.card);
        const check = Number(totals.check);
        if(cash !== 0 && card === 0 && check === 0){
            return "cash";
        } else if(cash === 0 && card !== 0 && check === 0){
            return "card";
        } else if(cash === 0 && card === 0 && check !== 0) {
            return "check";
        } else if(cash === 0 && card === 0 && check === 0){
            return "cash";
        } else {
            return "split";
        }
    }

    round = (num: number) => {
        if(Math.abs (num * 100 - Math.floor(num * 100) - .5) < .000001){
            if(Math.floor(num * 100) % 2 === 0){
                return Math.floor(num * 100) / 100;
            } else {
                return Math.floor(num * 100 + 1) / 100;
            }
        } else {
            return (Math.round(num * 100) / 100);
        }
    }
    roundAndFix = (num: number) => { return this.round(num).toFixed(2); }

    handlePromises = (res: any) => {
        let s_subtotal = 0;
        let p_subtotal = 0;

        res[1].forEach((p: any) => {
            p_subtotal = this.round(p_subtotal + Number(p.subtotal));
        });
        res[2].forEach((s: any) => {
            s_subtotal = this.round(s_subtotal + Number(s.salePrice));
        });

        const tax = p_subtotal * TAX_RATE;
        const roundedSubtotal = this.roundAndFix(p_subtotal + s_subtotal);
        const roundedTax = this.roundAndFix(tax);
        const rounded = this.roundAndFix(Number(roundedSubtotal) + Number(roundedTax));
        
        this.setState({
            appointment: res[0],
            products: res[1],
            services: res[2],
            loaded: true,
            total: rounded,
            p_subtotal: this.roundAndFix(p_subtotal),
            s_subtotal: this.roundAndFix(s_subtotal), 
            subtotal: roundedSubtotal,
            tax: roundedTax,
            totals: res[3] ? res[3] : { appointment: this.state.appointment.id, cash: 0, card: 0, check: 0, tax: 0, subtotal: 0 },
            post: res[3] ? false : true,
        });
    }

    loadData = () => {
        const p1 = getAppointmentDetails(this.state.appointment.id);
        const p2 = getAppointmentPSales(this.state.appointment.id);
        const p3 = getAppointmentSSales(this.state.appointment.id);
        const p4 = getAppointmentTotals(this.state.appointment.id);
        Promise.all([p1,p2,p3,p4])
            .then( this.handlePromises )
            .catch(err => {
                Promise.all([p1,p2,p3])
                    .then( this.handlePromises )
                    .catch(err => console.log(err));
            });
    }

    rightJustifyRow = (text: string, index: number) => {
        return (
            <Row style={{ justifyContent: "right" }} key={index}>
                <h5>{ text }</h5>
            </Row>
        );
    }

    header = () => {
        return (
            <>
                <h1> Appointment #{this.state.appointment.id} </h1>
                <div style={{ display: 'flex' }}>
                    <NavLink to={`/customer/${this.state.appointment.customer.id}`}>
                            <h3> { this.state.appointment.customer.first_name } { this.state.appointment.customer.last_name } </h3>
                    </NavLink>
                </div>
            </>
        );
    }

    body = () => {
        const sForm = <ServiceSaleForm appointment={this.state.appointment.id}/>;
        const pForm = <ProductSaleForm appointment={this.state.appointment.id}/>;
        const sAccordion = <AddAccordion text='Include Service Sale' form={sForm} />
        const pAccordion = <AddAccordion text='Include Product Sale' form={pForm} />

        return (
            <>
                <div>
                    {sAccordion}
                    <SSalesTable id={this.state.appointment.id} />
                </div>
                <div>
                    {pAccordion}
                    <PSalesTable id={this.state.appointment.id} />
                </div>
            </>
        );
    }

    footer = () => {
        const { totals, appointment, p_subtotal, s_subtotal, subtotal, tax, total, post } = this.state;
        const names = ["Product Subtotal:", "Product Tax:", "Service Subtotal:", "Subtotal:", "Total"];
        const amounts = [p_subtotal, tax, s_subtotal, subtotal, total];
        const values = amounts.map( a => "$" + a );

        return (
            <Container fluid style={{margin: "1rem 0rem"}}>
                <Row>
                    <Col>
                        <SelectPaymentForm
                            default     = { this.defaultPayment(totals) }
                            appointment = { appointment.id }
                            p_sub       = { p_subtotal }
                            s_sub       = { s_subtotal }
                            subtotal    = { subtotal }
                            tax         = { tax }
                            total       = { total }
                            totals      = { totals }
                            post        = { post }
                        />
                    </Col>
                    <Col md="auto" style={{ textAlign: "right", margin: "0rem 1rem"}}>
                        { names.map(this.rightJustifyRow) }
                    </Col>
                    <Col md="auto">
                        <Container fluid style={{ margin: "0rem", padding: "0rem" } } >
                            { values.map(this.rightJustifyRow) }
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }

    render() {
        if(this.state.loaded){
            return (
                <div>
                    { this.header() }
                    { this.body()   }
                    { this.footer() }
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Appointment
