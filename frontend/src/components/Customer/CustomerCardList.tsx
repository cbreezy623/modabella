import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import CustomerCard from './CustomerCard';
import { getAllCustomers } from '../Api/Api';

type propType = {};
type stateType = { cardList: Array<customer>; };

class CustomerCardList extends Component<propType, stateType> {
    constructor(props: propType) {
        super(props);
        this.state = {
            cardList: []
        };
    }

    compareByName(a: customer, b: customer) {
        if(a.last_name < b.last_name){
            return -1;
        } else if (a.last_name > b.last_name){
            return 1;
        } else { return 0; }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        getAllCustomers()
            .then(res => {
                this.setState({ cardList: res });
            })
            .catch(err => console.log(err));
    }

    render() {
        const cards = this.state.cardList.sort(this.compareByName).map((card: customer) => 
            <CustomerCard
                key={card.id}
                id={card.id}
                first_name={card.first_name}
                last_name={card.last_name}
                phone={card.phone}
                email={card.email}
                notes={card.notes}
            />
        );

        return (
            <CardDeck style={{ flexWrap: "wrap", margin:'0rem -.5rem'}}>
                { cards }
            </CardDeck>
        );
    }
}

export default CustomerCardList;