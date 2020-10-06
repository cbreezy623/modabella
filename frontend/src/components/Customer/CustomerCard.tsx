import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

class CustomerCard extends Component<customer, customer> {
    constructor(props: customer) {
        super(props);
        this.state = {
            id: props.id,
            first_name: props.first_name,
            last_name: props.last_name,
            phone: props.phone,
            email: props.email,
            notes: props.notes,
        };
    }

    render() {
        let { id, first_name, last_name, phone, email } = this.state;
        let customer_page = `customer/${ id }`;
        return (
            <Card style={{ minWidth: '15rem',
                    maxWidth: '15rem',
                    margin: '.5rem'}}>
                <Card.Body>
                    <Card.Title style={{ margin: '0rem' }}>
                        { first_name } { last_name }
                    </Card.Title>
                    <Card.Body style={{ padding: '1rem 0rem' }}>
                        Customer #{ id }
                        <br></br>
                        { phone }
                        <br></br>
                        { email }
                    </Card.Body>
                </Card.Body>
                <Card.Footer>
                    <Link to={ customer_page } >
                        <Button variant="primary">View Profile</Button>
                    </Link>
                </Card.Footer>
            </Card>
        );
    }
}

export default CustomerCard;