import React, { Component } from 'react';
import AppointmentTable from '../Appointment/AppointmentTable';
import Button from 'react-bootstrap/Button';
import DateRange from '../Shared/DateRange';

import 'react-widgets/dist/css/react-widgets.css'
import { Link } from 'react-router-dom';

class Appointments extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            start: "",
            end: "",
        };
    }

    picker = () => {
        
    }

    onChange = (obj: any) => {
        this.setState(obj)
    }

    render() {
        const divStyle = {
            padding: "1rem 0rem"
        }
        const dateWidget = (
            <DateRange onChange={ this.onChange }/>
        )

        return (
            <div>
                <h1>Appointments</h1>
                <div style={divStyle}>
                    <Link to='/calendar'>
                        <Button variant="primary">
                            Go To Appointment Book
                        </Button>
                    </Link>
                </div>
                { dateWidget }
                <AppointmentTable start={this.state.start} end={this.state.end}/>
            </div>
        );
    }
}

export default Appointments