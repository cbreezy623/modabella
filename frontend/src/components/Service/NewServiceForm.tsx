import React, { Component } from "react";
import ServiceForm from './ServiceForm';

const EMPTY_SERVICE = {
    id: 0,
    name: "",
    price: "",
    category: 0,
}

class NewServiceForm extends Component<any, service> {
    render() {
        return(
            <ServiceForm
                request="post"
                service={EMPTY_SERVICE}
            />
        );
    }
}

export default NewServiceForm