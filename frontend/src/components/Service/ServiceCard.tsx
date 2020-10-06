import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { deleteServmod, getCookie, getServModByBoth } from '../Api/Api';

type cardType = {
    id: number;
    s_id?: number;
    servmod?: boolean;
    modifier?: boolean;
    category?: boolean;
    name: string;
    price?: number;
    categoryName?: string;
}

class ServiceCard extends Component<cardType, cardType> {
    csrftoken: string;
    constructor(props: cardType) {
        super(props);
        this.state = {
            id: props.id,
            s_id: props.s_id,
            servmod: props.servmod,
            modifier: props.modifier,
            category: props.category,
            name: props.name,
            price: props.price,
            categoryName: props.categoryName
        };
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    disconnectModifier = () => {
        let servmodID = -1;
        if(this.state.s_id === undefined || this.state.id === undefined) return;

        getServModByBoth(this.state.s_id, this.state.id)
            .then( res => {
                servmodID = res[0].id;
                deleteServmod(servmodID, this.csrftoken)
                    .then( () => window.location.reload() )
                    .catch( err =>  console.log(err) );
            })
            .catch( err => console.log(err) );
        console.log(servmodID);
    }

    handleClick = (event: any) => {
        event.preventDefault();
        this.disconnectModifier();
    }

    button = ( service_page: string) => {
        if(this.state.servmod){
            return <Button variant="danger" onClick={this.handleClick}>Remove</Button>
        } else {
            return (
                <Link to={service_page}>
                    <Button variant="primary"> Details </Button>
                </Link>
            );
        }
    }

    render() {
        let cardStyle = this.state.category ? {minWidth: '10rem',
            maxWidth: '10rem',
            margin: '.5rem'
        } : {minWidth: '15rem', maxWidth: '15rem', margin: '.5rem'} ;
        let service_page = this.state.modifier ? `/modifier/` : `/service/`;
        service_page = this.state.category ? '/category/' : service_page;
        service_page += `${ this.state.id }`;
        let body = !this.state.category ? (
            <Card.Body>
                <Card.Title> { this.state.name } </Card.Title>
                <Card.Text> { this.state.categoryName }</Card.Text>
                <Card.Text> ${ this.state.price } </Card.Text>
            </Card.Body>
        ) : (
            <Card.Body>
                <Card.Title> { this.state.name } </Card.Title>
            </Card.Body>
        );
        let footer = !this.state.category ? (
            <Card.Footer>
                { this.button(service_page) }
            </Card.Footer>
        ) : (
            null
        );

        return(
            <Card style={cardStyle}>
                {body}
                {footer}
            </Card>
        );
    }
}

export default ServiceCard