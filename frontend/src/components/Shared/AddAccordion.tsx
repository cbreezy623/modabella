import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface props { text: string; form: JSX.Element }

class AddAccordion extends Component<props, any>{
    constructor(props: props){
        super(props);
        this.state = {};
    }

    header = () => {
        return (
            <Card.Header style={{ backgroundColor:'white', borderColor:'white', padding:'.5rem 0rem' }}>
                <Accordion.Toggle as={ Button } variant="primary" eventKey="0">
                    {this.props.text}
                </Accordion.Toggle>
            </Card.Header>
        );
    }

    collapse = () => {
        return (
            <Accordion.Collapse eventKey="0" style={{ padding:'.5rem 0rem' }}>
                <Card.Body style={{ padding:'1rem 1.25rem', border:'1px solid', borderColor:'#ced4da' }}>
                    { this.props.form }
                </Card.Body>
            </Accordion.Collapse>
        );
    }

    render() {
        return (
            <Accordion style={{ maxWidth: '30rem' }}>
                <Card style={{ borderColor:'white', padding:'0rem' }}>
                    { this.header() }
                    { this.collapse() }
                </Card>
            </Accordion>
        );
    }
}

export default AddAccordion