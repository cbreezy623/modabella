import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { getCustomer } from '../Api/Api';
import UpdateCustomerForm from './UpdateCustomerForm';
import AddAccordion from '../Shared/AddAccordion';
import AppointmentTable from '../Appointment/AppointmentTable';

interface Props extends RouteComponentProps { id: number; };
interface States { customer: customer; loaded: boolean; };

class Customer extends Component<Props, States> {
    //TODO: replace any with more appropriate prop type

    constructor(props: any) {
        super(props);
        this.state = {
            customer: {
                id: props.match.params.id,
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                notes: "",
            },
            loaded: false,
        };
    }

    componentDidMount(){
        this.refreshCustomerInfo();
    }

    refreshCustomerInfo = () => {
        getCustomer(this.state.customer.id)
            .then(res => {
                this.setState({ customer: res, loaded: true });
            })
            .catch(err => console.log(err)); //TODO: handle case when customer doesn't exist
    }

    render() {
        if(this.state.loaded){
            let c = this.state.customer;
            let f = <UpdateCustomerForm customer={this.state.customer}/>;
            let a = <AddAccordion text='Edit Info' form={f} />
            return (
                <div>
                    <div>
                        <h1>{ c.first_name} {c.last_name} </h1>
                        {a}
                        Customer #{ c.id } <br></br>
                        { c.phone } <br></br>
                        { c.email } <br></br>
                        { c.notes } <br></br>
                    </div>

                    <h3>Appointments</h3>
                    <AppointmentTable id={c.id}/>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Customer;
