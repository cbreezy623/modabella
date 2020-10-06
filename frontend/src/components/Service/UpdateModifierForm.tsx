import React, { Component } from "react";
import ModifierForm from "./ModifierForm";

interface props {
    modifier: modifier,
}

class UpdateModifierForm extends Component<any, any> {
    constructor(props: props){
        super(props);
        this.state = {
            id: props.modifier.id,
            name: props.modifier.name,
            price: props.modifier.price,
        }
    }

    render() {
        let modifier = this.state;
        return(
            <ModifierForm
                request="put"
                modifier={modifier}
            />
        );
    }
}

export default UpdateModifierForm