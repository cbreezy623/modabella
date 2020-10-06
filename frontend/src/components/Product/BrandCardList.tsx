import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import BrandCard from './BrandCard';
import { getAllBrands } from '../Api/Api';

type cardType = {
    id: number;
    name: string;
};

type propType = {};
type stateType = { cardList: Array<cardType>; };

class BrandCardList extends Component<propType, stateType> {
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
        getAllBrands()
            .then(res => this.setState({ cardList: res}))
            .catch(err => console.log(err));
    }

    render() {
        return(
            <CardDeck style={{ flexWrap: "wrap", margin:'0rem -.5rem'}}>
                {
                    this.state.cardList.map((card: cardType) =>
                        <BrandCard 
                            key={card.id}
                            id={card.id}
                            name={card.name}
                        />
                    )
                }
            </CardDeck>
        );
    }
}

export default BrandCardList