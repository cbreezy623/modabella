import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Appointments from '../Pages/Appointments';
import Customers from '../Pages/Customers';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import Services from '../Pages/Services';
import Bar from '../Common/Navbar';
import Customer from '../Customer/Customer';
import Sales from '../Pages/Sales';
import CalendarPage from '../Pages/CalendarPage';
import Appointment from '../Appointment/Appointment';
import Product from '../Product/Product';
import Service from '../Service/Service';
import PSale from '../Sales/PSale';
import SSale from '../Sales/SSale';
import Modifier from '../Service/Modifier';

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import Footer from '../Common/Footer';

Moment.locale('en');
momentLocalizer();

class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <BrowserRouter>
                <Bar />
                <div style={{margin: '1rem 4rem'}}>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/customers" component={Customers} exact/>
                        <Route path="/products" component={Products} exact/>
                        <Route path="/appointments" component={Appointments} exact/>
                        <Route path="/services" component={Services} exact/>
                        <Route path="/customer/:id" component={Customer} exact/>
                        <Route path="/appointment/:id" component={Appointment} exact/>
                        <Route path="/service/:id" component={Service} exact/>
                        <Route path="/modifier/:id" component={Modifier} exact/>
                        <Route path="/product/:id" component={Product} exact/>
                        <Route path="/psale/:id" component={PSale} exact/>
                        <Route path="/ssale/:id" component={SSale} exact/>
                        <Route path="/sales" component={Sales} exact/>
                        <Route path="/calendar" component={CalendarPage} exact/>
                    </Switch>
                </div>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;