import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck'
import ServiceCard from './ServiceCard'
import { getAllServices } from '../Api/Api';

type cardType = {
    id: number;
    name: string;
    price: number;
    category: {
        id: number;
        name: string;
    }
};

type propType = {};
type stateType = { cardList: Array<cardType>; };

class ServiceCardList extends Component<propType, stateType> {
    constructor(props: propType) {
        super(props);
        this.state = {
            cardList: []
        };
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () => {
        getAllServices()
            .then(res => this.setState({ cardList: res}))
            .catch(err => console.log(err));
    }

    compareCards = (a: cardType, b: cardType) => {
        if(a.category.name.localeCompare(b.category.name) < 0) { return -1; }
        else if(a.category.name.localeCompare(b.category.name) > 0) { return 1; }
        else {
            if(a.name.localeCompare(b.name) < 0) { return -1; }
            else if(a.name.localeCompare(b.name) > 0) { return 1; }
            else { return 0; }
        }
    }

    render() {
        return(
            <CardDeck style={{ flexWrap: "wrap", margin:'0rem -.5rem'}}>
                {
                    this.state.cardList
                        .sort(this.compareCards)
                        .map((card: cardType) =>
                        <ServiceCard 
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            price={card.price}
                            categoryName={card.category.name}
                        />
                    )
                }
            </CardDeck>
        );
    }
}

export default ServiceCardList