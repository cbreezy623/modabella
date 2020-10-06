import React, { Component} from 'react';
import Calendar from '../Calendar/Calendar'

class CalendarPage extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    onCommitChanges(){}
  
    render() {
        return (
            <Calendar />
        );
    }
}

export default CalendarPage;