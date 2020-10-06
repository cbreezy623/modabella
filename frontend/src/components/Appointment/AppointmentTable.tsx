import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import AppointmentTableEntry from './AppointmentTableEntry';
import moment from 'moment';
import { getAppointmentEntries, getAppointmentEntriesCustomer, getAppointmentEntriesRange } from '../Api/Api';

type propType = { id?: number; start?: string; end?: string }
type stateType = { c_id?: number; start?: string; end?: string; entries: Array<appointmentTableEntry>; totals: any};

class AppointmentTable extends Component<propType, stateType>{
    constructor(props: propType){
        super(props);
        this.state = {
            c_id: props.id,
            start: props.start,
            end: props.end,
            entries: [],
            totals: {
                cash: 0,
                card: 0,
                check: 0,
                tax: 0,
                p_sub: 0,
                s_sub: 0,
                subtotal: 0,
            }
        };
    }

    componentDidMount(){
        let start = this.props.start;
        let end = this.props.end;
        if(start === undefined || end === undefined){
            if(this.state.c_id === undefined) {
                this.refreshList();
            } else {
                this.refreshCustomerEntries();
            }
        }
    }

    componentDidUpdate(){
        let start = this.props.start;
        let end = this.props.end;
        if(start && end && this.isRanged(start, end)){
            this.setState({ start: start, end: end })
            this.refreshRanged(start, end);
        }
    }

    isRanged = (start: string, end: string) : boolean => {
        return (
            start !== "" && end !== "" &&
            (start !== this.state.start || end !== this.state.end)
        )
    }

    setEntries = (res: any) => {
        let totals = { cash: 0, card: 0, check: 0, tax: 0, p_sub: 0, s_sub: 0 }
        res.forEach( (entry: any) => {
            totals.cash += Number(entry.cash);
            totals.card += Number(entry.card);
            totals.check += Number(entry.check);
            totals.tax += Number(entry.tax);
            totals.p_sub += Number(entry.p_sub);
            totals.s_sub += Number(entry.s_sub);
            totals.cash = (Math.round(totals.cash * 100) / 100);
            totals.card = (Math.round(totals.card * 100) / 100);
            totals.check = (Math.round(totals.check * 100) / 100);
            totals.tax = (Math.round(totals.tax * 100) / 100);
            totals.p_sub = (Math.round(totals.p_sub * 100) / 100);
            totals.s_sub = (Math.round(totals.s_sub * 100) / 100);
        });
        this.setState({ entries: res, totals: totals });
    }

    refreshList = () => {
        getAppointmentEntries()
            .then(this.setEntries)
            .catch(err => console.log(err));
    }

    refreshRanged = (start: string, end: string) => {
        getAppointmentEntriesRange(start, end)
            .then(this.setEntries)
            .catch(err => console.log(err));
    }

    refreshCustomerEntries = () => {
        if(this.state.c_id === undefined) return;
        getAppointmentEntriesCustomer(this.state.c_id)
            .then(this.setEntries)
            .catch(err => console.log(err));
    }

    compareByDate(a: appointmentTableEntry, b: appointmentTableEntry) {
        if(moment(a.startDate).isBefore(b.startDate)){ return 1; }
        else if(moment(b.startDate).isBefore(a.startDate)){ return -1; }
        else { return 0; }
    }

    render() {
        let entries = this.state.entries
            .sort(this.compareByDate)
            .map((entry: appointmentTableEntry) => {
                return (
                    <AppointmentTableEntry
                    key={entry.id}
                    entry={entry}
                    />
                )
            }
        );
        
        let { cash, card, check, p_sub, s_sub, tax } = this.state.totals;
        let grand = Number( cash + card + check ).toFixed(2);

        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr style={{textAlign:"center"}}>
                        <th>AID</th>
                        <th>CID</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Cash</th>
                        <th>Card</th>
                        <th>Check</th>
                        <th>Products</th>
                        <th>Tax</th>
                        <th>Services</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    { entries }
                    <tr style={{textAlign:"right"}}>
                        <td colSpan={7}>Totals</td>
                        <td>${ Number(cash).toFixed(2) }</td>
                        <td>${ Number(card).toFixed(2) }</td>
                        <td>${ Number(check).toFixed(2) }</td>
                        <td>${ Number(p_sub).toFixed(2) }</td>
                        <td>${ Number(tax).toFixed(2) }</td>
                        <td>${ Number(s_sub).toFixed(2) }</td>
                        <td>${ grand }</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default AppointmentTable