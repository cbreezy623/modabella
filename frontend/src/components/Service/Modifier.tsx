import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { getModifier } from '../Api/Api';
import AddAccordion from '../Shared/AddAccordion';
import UpdateModifierForm from './UpdateModifierForm';
// import AddAccordion from '../Shared/AddAccordion';
// import UpdateProductForm from './UpdateProductForm';

interface Props extends RouteComponentProps { id: number; };

class Modifier extends Component<Props,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id,
            modifier: {
                id: 0,
                name: "",
                price: "",
            },
            loaded: false,
        };
    }

    modifier = () => {
        let { id, name, price } = this.state.modifier;
        return ({
            id: id,
            name: name,
            price: price,
        });
    }

    getModifier = () => {
        getModifier(this.state.id)
            .then(res => {
                this.setState({ modifier: res, loaded: true });
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getModifier();
    }

    render() {
        if(!this.state.loaded) { return null; }

        const { modifier } = this.state;
        const { name, price } = modifier;
        const f = <UpdateModifierForm modifier={ this.modifier() } />
        const a = <AddAccordion text="Edit" form={f} />
        return (
            <div>
                <h1>{ name }</h1>
                <h3>${ price }</h3>
                { a }
            </div>
        );
    }
}

export default Modifier