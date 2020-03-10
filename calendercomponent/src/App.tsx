import React from 'react';
import './App.scss';
import {CalendarEntry} from "./components/calendarentry";
import {dummydata} from "./dummydata";
import {CalendarHeader} from "./components/calendarheader";
import moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb');

function App() {
    const [currentMonth, setCurrentMonth] = React.useState('');
    const [selectedMonth, setSelectedMonth] = React.useState<any[]>([]);
    let list = {} as any;

    React.useEffect(() => {
        setCurrentMonth(moment().format("MMMM"));

    }, [])
    React.useEffect(() => {
        dummydata.map((dateObj: any) => {
            const currentDate = moment(dateObj.datoer[0].start).format("MMMM");
            if (list[currentDate]) {
                list[currentDate].push(dateObj);
            } else {
                list[currentDate] = [dateObj];
            }
        });
    }, [list]);

    const dateFilter = (entry: any) => {
        if (entry.datoer.map((d: any) => moment(d.start).format("MMMM"))[0] === currentMonth) {
            return entry;
        }
        return null;
    };


    React.useEffect(() => {
        dummydata.map((entry, i) => {
            if (entry.datoer.map((d: any) => moment(d.start).format("MMMM"))[0] === currentMonth) {
                combineSameDays(currentMonth)
            }
        })
    }, [currentMonth]);

    const combineSameDays = (currentMonth: any) => {
        setSelectedMonth(list[currentMonth])
    };

    const prevMonth = moment().month(currentMonth).subtract(1, 'months').endOf('month').format('MMMM');
    const nextMonth = moment().month(currentMonth).add(1, 'months').endOf('month').format('MMMM');
    console.log(selectedMonth)
    return (
        <div className='main-wrapper'>
            <CalendarHeader
                goToNextMonth={() => setCurrentMonth(nextMonth)}
                goToPrevMonth={() => setCurrentMonth(prevMonth)}
                currentMonth={currentMonth}/>
            <div className="calendar-wrapper">
                {dummydata.map((entry, i) => {
                    return <CalendarEntry
                        allEntries={selectedMonth}
                        key={i}
                        date={dateFilter(entry)}
                        targetGroup={entry.malgruppe.map((group, i) => <span key={i}
                                                                             className='target-group'>{group}</span>)}
                        title={entry.tittel}/>

                })}
            </div>
        </div>
    );
}

export default App;
