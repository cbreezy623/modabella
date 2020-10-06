import moment from 'moment';
import React, { Component } from 'react';
import { DateTimePicker } from 'react-widgets';

const DFORMAT = 'YYYY-MM-DD';
const DAY = 24*3600*1000;

class DateRange extends Component<any,any> {
    onChange: (obj: any) => void;
    constructor(props: any){
        super(props);
        this.state = {
            start: "",
            end: "",
        };
        this.onChange = props.onChange;
    }

    now = new Date();
    first = new Date(this.now.getTime() - this.now.getDay()*DAY);
    next = new Date(this.first.getTime() + 6*DAY);

    componentDidMount = () => {
        const start = moment(this.first).format(DFORMAT);
        const end = moment(this.next).format(DFORMAT);
        const d = { start: start, end: end };
        this.setState(d);
        this.onChange(d);
    }

    pickerChange = (text: string) => {
        text = text.toLowerCase();
        const onChange = (newTime: any) => {
            const ftime = moment(newTime).format(DFORMAT);
            let d = { [text]: ftime }
            this.setState(d);
            if(text === 'end' && newTime){
                const fptime = moment(newTime.getTime()).format(DFORMAT);
                d = { [text]: fptime}
            }
            this.onChange(d);
        }

        return onChange;
    }

    picker = (date: any, text: string) => {
        const onChange = this.pickerChange(text);

        return (
            <div>
                <h5>{ text }</h5>
                <DateTimePicker
                    time={false}
                    defaultValue={date}
                    onChange={ onChange }
                />
            </div>
        );
    }

    render() {
        return (
            <div style={{ display: "flex", margin: "0rem 0rem 1rem 0rem" }}>
                { this.picker(this.first, 'Start') }
                { this.picker(this.next, 'End') }
            </div>
        );
    }
}

export default DateRange;