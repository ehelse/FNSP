import React from 'react';
import './App.scss';
import {CalendarEntry} from "./components/calendarentry";
import {dummydata} from "./dummydata";
import {CalendarHeader} from "./components/calendarheader";
import moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb');

const newDate = moment();
console.log(newDate.format('LLLL'));

function App() {

    const dateFilter = (entry: any) => {
        if (moment(entry.datoer.map((d: any) => d.start)).format("MMMM") === moment().format("MMMM")) {
            return entry.datoer
        }
        return entry.datoer
    };
    return (
        <div className='main-wrapper'>
            <CalendarHeader currentMonth={moment().format('MMMM YYYY')}/>
            <div className="calendar-wrapper">
                {dummydata.map((entry, i) => {
                    return <CalendarEntry
                        key={i}
                        date={dateFilter(entry)}
                        targetGroup={entry.malgruppe.map(group => <span className='target-group'>{group}</span>)}
                        title={entry.tittel}/>

                })}
            </div>
        </div>
    );
}

export default App;
