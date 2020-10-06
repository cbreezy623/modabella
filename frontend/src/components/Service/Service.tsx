import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import ServiceCard from './ServiceCard';
import { CardDeck } from 'react-bootstrap';
import ConnectModifier from './ConnectModifier';
import UpdateServiceForm from './UpdateServiceForm';
import AddAccordion from '../Shared/AddAccordion';
import { getService, getServModsByService } from '../Api/Api';

interface Props extends RouteComponentProps { id: number; };

class Service extends Component<Props,any> {
    constructor(props: any){
        super(props);
        this.state = {
            service: {
                id: props.match.params.id,
                name: "",
                price: "",
                category: {
                    id: 0,
                    name: "",
                },
            },
            servmods: [],
            loaded: false,
        };
    }

    componentDidMount() {
        this.getServiceInfo();
        this.getServmods();
    }

    getServiceInfo() {
        getService(this.state.service.id)
            .then(res => this.setState({ service: res, loaded: true}))
            .catch(err => console.log(err))
    }

    getServmods() {
        getServModsByService(this.state.service.id)
            .then(res => this.setState({ servmods: res }))
            .catch(err => console.log(err))
    }

    service = () => {
        return ({
            id: this.state.service.id,
            name: this.state.service.name,
            price: this.state.service.price,
            category: this.state.service.category,
        });
    }

    serviceAccordion = () => {
        let f = <UpdateServiceForm service={ this.service() }/>
        return (<AddAccordion text='Edit Info' form={f} />);
    }

    render() {
        if(this.state.loaded){
            let servmods = this.state.servmods;
            let a = this.serviceAccordion();
            return (
                <div>
                    <h1>{this.state.service.category.name} - {this.state.service.name}</h1>
                    <h3>${this.state.service.price}</h3>
                    { a }
                    <ConnectModifier id={this.state.service.id}/>
                    <CardDeck style={{ flexWrap: "wrap", margin:'0rem -.5rem'}}>
                        {
                            servmods.map((servmod: any) =>
                                <ServiceCard
                                    key={servmod.id}
                                    id={servmod.modifier.id}
                                    s_id={servmod.service.id}
                                    name={servmod.modifier.name}
                                    price={servmod.modifier.price}
                                    servmod={true}
                                />
                            )
                        }
                    </CardDeck>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Service
