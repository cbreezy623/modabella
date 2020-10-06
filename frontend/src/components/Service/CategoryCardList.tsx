import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import ServiceCard from './ServiceCard';
import { getAllCategories } from '../Api/Api';

type cardType = {
    id: number;
    name: string;
};

type propType = {};
type stateType = { cardList: Array<cardType>; };

class CategoryCardList extends Component<propType, stateType> {
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
        getAllCategories()
            .then(res => {
                this.setState({ cardList: res });
            })
            .catch(err => console.log(err));
    }

    render() {
        return(
            <CardDeck style={{ flexWrap: "wrap", margin:'0rem -.5rem'}}>
                {
                    this.state.cardList.map((card: cardType) =>
                        <ServiceCard 
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            category={true}
                        />
                    )
                }
            </CardDeck>
        );
    }
}

export default CategoryCardList