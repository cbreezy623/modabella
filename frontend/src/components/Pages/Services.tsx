import React, { Component } from 'react';
import ServiceCardList from '../Service/ServiceCardList';
import ModifierCardList from '../Service/ModifierCardList';
import AddAccordion from '../Shared/AddAccordion';
import NewServiceForm from '../Service/NewServiceForm';
import NewModifierForm from '../Service/NewModifierForm';
import CategoryCardList from '../Service/CategoryCardList';
import NewCategoryForm from '../Service/NewCategoryForm';

class Services extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Categories</h1>
                <AddAccordion text='Add Category' form={<NewCategoryForm />} />
                <CategoryCardList />
                <h1>Services</h1>
                <AddAccordion text='Add Service' form={<NewServiceForm />} />
                <ServiceCardList />
                <div style={{margin:"2rem 0rem"}}></div>
                <h1>Modifiers</h1>
                <AddAccordion text='Add Modifier' form={<NewModifierForm />} />
                <ModifierCardList />
            </div>
        );
    }
}

export default Services