import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import ProductCard from './ProductCard';
import { getAllProducts } from '../Api/Api';

type cardType = {
    id: number;
    name: string;
    brand: {
        id: number;
        name: string;
    };
    price: number;
};

type propType = {};
type stateType = { cardList: Array<cardType>; };

class ProductCardList extends Component<propType, stateType> {
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
        getAllProducts()
            .then(res => this.setState({ cardList: res}))
            .catch(err => console.log(err));
    }

    compareCards = (a: cardType, b: cardType) => {
        if(a.brand.name.localeCompare(b.brand.name) < 0) { return -1; }
        else if(a.brand.name.localeCompare(b.brand.name) > 0) { return 1; }
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
                        <ProductCard 
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            brand={card.brand}
                            price={card.price}
                        />
                    )
                }
            </CardDeck>
        );
    }
}

export default ProductCardList