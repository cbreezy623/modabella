import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import moment from 'moment';

interface prop { entry: appointmentTableEntry }
interface state { entry: appointmentTableEntry }

class AppointmentTableEntry extends Component<prop, state>{
    constructor(props: prop){
        super(props);
        this.state = {
            entry: props.entry,
        };
    }

    render() {
        let { id, c_id, first_name, last_name, startDate, endDate, cash, card, check, p_sub, tax, s_sub } = this.state.entry;
        let total = Number(cash) + Number(card) + Number(check)
        const row = () => ( <Route render={({ history }) => (
            <tr style={{textAlign:"right"}} key={ id } onClick={ () => { history.push(`/appointment/${this.state.entry.id}`)} }>
                <td>{ id }</td>
                <td>{ c_id }</td>
                <td>{ first_name }</td>
                <td>{ last_name }</td>
                <td>{ moment(startDate).format('ll') } </td>
                <td>{ moment(startDate).format('LT') }</td>
                <td>{ moment(endDate).format('LT') }</td>
                <td>${ Number(cash).toFixed(2) }</td>
                <td>${ Number(card).toFixed(2) }</td>
                <td>${ Number(check).toFixed(2) }</td>
                <td>${ Number(p_sub).toFixed(2) }</td>
                <td>${ Number(tax).toFixed(2) }</td>
                <td>${ Number(s_sub).toFixed(2) }</td>
                <td>${ Number(total).toFixed(2) }</td>
            </tr>
        )} />);
        
        return row();
    }
}

export default AppointmentTableEntry