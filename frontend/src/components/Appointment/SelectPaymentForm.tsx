import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import SplitForm from './SplitForm';
import { postTotals, putTotals, getCookie } from '../Api/Api';

class SelectPaymentForm extends Component<any,any> {
    csrftoken: string;
    constructor(props: any) {
        super(props);
        this.state = {
            default: props.default,
            appointment: props.appointment,
            total: props.total,
            p_sub: props.p_sub,
            s_sub: props.s_sub,
            subtotal: props.subtotal,
            tax: props.tax,
            split: props.default === "split",
            totals: props.totals,
        };
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    componentDidMount = () => {
        if( this.props.post ){
            postTotals(this.props.totals, this.csrftoken)
                .then(res => {
                    //console.log(res)
                })
                .catch(err => console.log(err));
        } else if(!this.state.split) {
            this.onChangePayment({target: {value: this.state.default}});
        }
    }

    getTotals = (method: string) : totals => {
        let cash = method === "cash" ? this.state.total : 0;
        let card = method === "card" ? this.state.total : 0;
        let check = method === "check" ? this.state.total : 0;

        return ({
            appointment: this.state.appointment,
            cash: cash,
            card: card,
            check: check,
            subtotal: this.state.subtotal,
            tax: this.state.tax,
            p_sub: this.state.p_sub,
            s_sub: this.state.s_sub,
        });
    }

    onChangePayment = (payment: any) => {
        let split = payment.target.value === "split";
        this.setState({split: split});
        if(!split){
            let totals = this.getTotals(payment.target.value);
            this.setState({totals: totals});
            putTotals(totals, this.csrftoken)
                .then(res => {
                    //console.log(res)
                })
                .catch(err => console.log(err));
        }
    }

    paymentRow = () => {
        return (
            <div>
                <Form.Label><h5>Select Payment Method</h5></Form.Label>
                <Form.Row>
                    <Form.Group as="select" onChange={this.onChangePayment} defaultValue={this.state.default}>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="check">Check</option>
                        <option value="split">Split</option>
                    </Form.Group>
                </Form.Row>
            </div>
        );
    }

    split = () => {
        return (
            <SplitForm
                cash={this.state.totals.cash}
                card={this.state.totals.card}
                check={this.state.totals.check}
                p_sub={this.state.p_sub}
                s_sub={this.state.s_sub}
                subtotal={this.state.subtotal}
                tax={this.state.tax}
                total={this.state.total}
                appointment={this.state.appointment}/>
        );
    }

    render() {
        return (
            <div>
                { this.paymentRow() }
                { this.state.split ? this.split() : null }
            </div>
        );
    }
}

export default SelectPaymentForm