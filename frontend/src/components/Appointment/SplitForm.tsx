import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getCookie, putTotals } from '../Api/Api';
import { Prompt } from 'react-router-dom';

interface props {
    appointment: number;
    cash?: number;
    card?: number;
    check?: number;
    total: number;
    p_sub: number;
    s_sub: number;
    subtotal: number;
    tax: number;
}

class SplitForm extends Component<props,totals> {
    csrftoken: string;
    constructor(props: props){
        super(props);
        this.state = {
            appointment: props.appointment,
            cash: props.cash ? props.cash : 0,
            card: props.card ? props.card : 0,
            check: props.check ? props.check : 0,
            p_sub: props.p_sub,
            s_sub: props.s_sub,
            subtotal: props.subtotal,
            tax: props.tax,
        };
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    total = () => { return Number(this.props.total); }

    splitTotal = () => {
        return (
            Number(this.state.cash) +
            Number(this.state.card) +
            Number(this.state.check)
        );
    }

    onSubmit = (event: any) => {
        let total = this.total();
        let splitTotal = this.splitTotal();
        if(Math.abs(total - splitTotal) > .0001){
            alert(
                "The split total ($" +
                Number(splitTotal).toFixed(2) + 
                ") is not equal to the calculated total ($" +
                Number(total).toFixed(2) + ")"
            );
            return;
        }
        event.preventDefault();
        let totals = {
            appointment: this.state.appointment,
            cash: this.state.cash,
            card: this.state.card,
            check: this.state.check,
            tax: this.state.tax,
            p_sub: this.state.p_sub,
            s_sub: this.state.s_sub,
            subtotal: this.state.subtotal,
        };
        putTotals(totals, this.csrftoken)
    }

    blockNav = () : boolean => {
        return Math.abs(this.total() - this.splitTotal()) > .0001;    
    }

    cashRow = () => {
        return (
            <Form.Row>
                <Form.Group onChange={ (cash: any) => {
                        this.setState({cash: cash.target.value})
                    }}>
                    <Form.Label>Cash</Form.Label>
                    <Form.Control defaultValue={this.props.cash}/>
                </Form.Group>
            </Form.Row>
        );
    }

    cardRow = () => {
        return (
            <Form.Row>
                <Form.Group onChange={ (card: any) => {
                        this.setState({card: card.target.value})
                    }}>
                    <Form.Label>card</Form.Label>
                    <Form.Control defaultValue={this.props.card}/>
                </Form.Group>
            </Form.Row>
        );
    }

    checkRow = () => {
        return (
            <Form.Row>
                <Form.Group onChange={ (check: any) => {
                        this.setState({check: check.target.value})
                    }}>
                    <Form.Label>check</Form.Label>
                    <Form.Control defaultValue={this.props.check}/>
                </Form.Group>
            </Form.Row>
        );
    }

    render() {
        return (
            <div>
            <Prompt
                when={this.blockNav()}
                message={
                    "The split total ($" +
                    Number(this.splitTotal()).toFixed(2) + 
                    ") is not equal to the calculated total ($" +
                    Number(this.total()).toFixed(2) + ")" +
                    "\n\nPress cancel to remain on page and fix split entries. Press ok to leave page." +
                    "\n\nWARNING! It is recommended that you click cancel and fix split entries."
                }
            />
            <Form id="splitForm">
                { this.cashRow() }
                { this.cardRow() }
                { this.checkRow() }
                <Button variant="success" onClick={this.onSubmit}> Save </Button>
            </Form>
            </div>
        );
    }
}

export default SplitForm