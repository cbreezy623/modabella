import React, { Component} from 'react';
import { Paper } from '@material-ui/core';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    DateNavigator,
    TodayButton,
    ViewSwitcher,
    MonthView,
    DayView,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
    Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import {
    deleteAppointment,
    updateAppointment,
    addAppointment,
    getAllAppointments,
    getAllSchedulerCustomers,
    getCookie,
    postTotals
} from '../Api/Api';

const currentDate = moment.now();

class Calendar extends Component<any,any> {
    csrftoken: string;
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            resources: [],
        };
        this.csrftoken = getCookie(document, 'csrftoken');
    }

    componentDidMount(){
        this.getCustomers();
        this.getAppointments();
    }

    getAppointments(){
        getAllAppointments()
            .then(res => this.setState({ data: res }))
            .catch(err => console.log(err));
    }

    getCustomers(){
        getAllSchedulerCustomers()
            .then(res => this.setState({ resources: [{
                fieldName: 'customer',
                title: 'Customer',
                instances: res,
            }]}));
    }

    addAppointment(entry: any) {
        addAppointment(entry, this.csrftoken)
            .then(res => {
                console.log(res);
                postTotals({
                    appointment: res.id,
                    cash: 0, card: 0, check: 0, tax: 0, subtotal: 0, p_sub: 0, s_sub: 0
                }, this.csrftoken)
                    .then(res => console.log(res));
            })
            .catch(err =>  console.log(err));
    }

    updateAppointments(id: number, updated: any){
        updateAppointment(id, updated, this.csrftoken)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    deleteAppointment(id: number){
        deleteAppointment(id, this.csrftoken)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    //TODO: refactor
    commitChanges = ({ added, changed, deleted }: any) => {
        let { data } = this.state;
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
            this.addAppointment(added);
        }
        if (changed) {
            data = data.map((appointment: any) => {
                if(changed[appointment.id]){
                    let updated = { ...appointment, ...changed[appointment.id] };
                    this.updateAppointments(appointment.id, updated);
                    return updated;
                } else {
                    return appointment;
                }
            });
        }
        if (deleted !== undefined) {
            this.deleteAppointment(deleted);
            data = data.filter((appointment: any) => appointment.id !== deleted);
        }

        this.setState({ data: data });
    }
  
    render() {
        const { data, resources } = this.state;
        return (
            <Paper>
                <Scheduler data={data} >
                    <ViewState defaultCurrentViewName="Week" defaultCurrentDate={currentDate}/>
                    <EditingState onCommitChanges={this.commitChanges}/>
                    <IntegratedEditing />
                    <DayView />
                    <WeekView startDayHour={8} endDayHour={22} />
                    <MonthView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <Appointments />
                    <ConfirmationDialog />
                    <AppointmentTooltip showOpenButton showDeleteButton showCloseButton/>
                    <AppointmentForm />
                    <Resources data={resources} mainResourceName='customer' />
                </Scheduler>
            </Paper>
        );
    }
}

export default Calendar;