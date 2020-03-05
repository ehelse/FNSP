import React from 'react';
import './App.scss';
import {CalendarEntry} from "./components/calendarentry";
import {dummydata} from "./dummydata";
import {CalendarHeader} from "./components/calendarheader";
import moment, {monthsShort} from 'moment'
import 'moment/locale/nb'

moment.locale('nb');

function App() {
    const [currentMonth, setCurrentMonth] = React.useState('');
    React.useEffect(() => {
        setCurrentMonth(moment().format("MMMM"));
    }, []);
    const dateFilter = (entry: any) => {
        if (entry.datoer.map((d: any) => moment(d.start).format("MMMM"))[0] === currentMonth) {
            return entry.datoer
        }
        return null
    };
    const prevMonth = moment().month(currentMonth).subtract(1,'months').endOf('month').format('MMMM');
    const nextMonth = moment().month(currentMonth).add(1,'months').endOf('month').format('MMMM');

    return (
        <div className='main-wrapper'>
            <CalendarHeader
                goToNextMonth={() => setCurrentMonth(nextMonth)}
                goToPrevMonth={() => setCurrentMonth(prevMonth)}
                currentMonth={currentMonth}/>
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
