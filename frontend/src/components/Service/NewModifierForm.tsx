import React, { Component } from "react";
import ModifierForm from "./ModifierForm";

const EMPTY_MODIFIER = {
    id: 0,
    name: "",
    price: "",
}

class NewModifierForm extends Component<any, any> {
    render() {
        return(
            <ModifierForm
                request="post"
                modifier={EMPTY_MODIFIER}
            />           
        );
    }
}

export default NewModifierForm