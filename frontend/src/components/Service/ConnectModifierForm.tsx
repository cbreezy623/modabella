import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addServMod, getAllModifiers, getCookie } from '../Api/Api';

interface PropsType { id: number };

class ConnectModifierForm extends Component<PropsType,any> {
    csrftoken: string;
    constructor(props: PropsType){
        super(props);
        this.state = {
            id: props.id,
            modID: 1,
            modifiers: [],
        };
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    componentDidMount = () => {
        this.getModifiers();
    }

    getModifiers = () => {
        getAllModifiers()
            .then(res => {
                this.setState({ modifiers: res});
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.connectModifier();
    }

    connectModifier() {
        let data = { service: parseInt(this.state.id), modifier: parseInt(this.state.modID)}
        addServMod(data, this.csrftoken)
            .then(res => {
                window.location.reload();
            })
            .catch(() =>  {
                alert("Error: Could not connect modifier to service.")
            });
    }

    onChange = (mod: any) => {
        let id = mod.target.value;
        this.setState({ modID: id});
    }

    render() {
        return (
            <Form onSubmit={ this.handleSubmit } id="connectModifierForm">
                <Form.Group as="select" onChange={this.onChange}>
                    {this.state.modifiers.map((item: any) => {
                        return (<option value={item.id} key={item.id}>{item.name}</option>);
                    })}
                </Form.Group>
                <br></br>
                <Button variant="success" type="submit"> Connect </Button>
            </Form>
        );
    }
}

export default ConnectModifierForm