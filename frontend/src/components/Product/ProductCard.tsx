import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';

type cardType = {
    id: number;
    name: string;
    brand: {
        id: number;
        name: string;
    };
    price: number;
}

class ProductCard extends Component<cardType, cardType> {
    constructor(props: cardType) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            brand: props.brand,
            price: props.price,
        };
    }

    render() {
        let url = `/product/${this.state.id}`;
        return(
            <Card style={{minWidth: '15rem',
                    maxWidth: '15rem',
                    margin: '.5rem'}}>
                <Card.Body>
                    <Card.Title>{ this.state.brand.name } { this.state.name } </Card.Title>
                    <Card.Text> ${ this.state.price } </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={url}>
                        <Button variant="primary"> Details </Button>
                    </Link>
                </Card.Footer>
            </Card>
        );
    }
}

export default ProductCard