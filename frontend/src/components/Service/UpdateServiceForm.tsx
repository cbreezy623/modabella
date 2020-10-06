import React, { Component } from "react";
import ServiceForm from './ServiceForm';

interface propType {
    service: service,
}

class UpdateServiceForm extends Component<any, any> {
    constructor(props: propType){
        super(props);
        this.state = {
            id: props.service.id,
            name: props.service.name,
            price: props.service.price,
            category: props.service.category,
        }
    }

    render() {
        let service = this.state;
        return(
            <ServiceForm
                request="put"
                service={service}
            />
        );
    }
}

export default UpdateServiceForm