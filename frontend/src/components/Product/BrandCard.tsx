import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'

type cardType = {
    id: number;
    name: string;
}

class BrandCard extends Component<cardType, cardType> {
    constructor(props: cardType) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
        };
    }

    render() {
        return(
            <Card style={{minWidth: '10rem',
                    maxWidth: '10rem',
                    margin: '.5rem'}}>
                <Card.Body>
                    <Card.Title>{ this.state.name } </Card.Title>
                </Card.Body>
            </Card>
        );
    }
}

export default BrandCard