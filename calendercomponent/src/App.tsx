import React, {useEffect} from 'react';
import './App.scss';
import {CalendarEntry} from "./components/calendarentry";
import {dummydata} from "./dummydata";
import {CalendarFooter} from "./components/calendarFooter";
import moment from 'moment'
import 'moment/locale/nb'
import {CalendarHeader} from "./components/CalendarHeader";

moment.locale('nb');

function App() {
    const [currentMonth, setCurrentMonth] = React.useState('');
    const [selectedMonth, setSelectedMonth] = React.useState<any[]>([]);
    const [dates, setDates] = React.useState<any[]>([]);

    let list = {} as any;

    React.useEffect(() => {
        setCurrentMonth(moment().format("MMMM"));
        checkIfSameDates()
    }, []);

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

    React.useEffect(() => {
        dummydata.map((entry, i) => {
            if (entry.datoer.map((d: any) => moment(d.start).format("MMMM"))[0] === currentMonth) {
                combineSameDays(currentMonth)
            }
        })
    }, [currentMonth]);

    useEffect(() => {
        checkIfSameDates()
    }, [selectedMonth]);

    const dateFilter = (entry: any) => {
        if (entry.datoer.map((d: any) => moment(d.start).format("MMMM"))[0] === currentMonth) {
            return entry;
        }
        return null;
    };

    const combineSameDays = (currentMonth: any) => {
        setSelectedMonth(list[currentMonth])
    };

    const checkIfSameDates = () => {
        let dateList = {} as any;
        dummydata.reduce((acc: any, cur: any) => {
            if (!Object.keys(acc).length) {
                dateList[moment(cur?.datoer[0].start).date()] = [cur];
                return cur;
            }
            const accDato = acc?.datoer[0].start;
            const curDato = cur?.datoer[0].start;

            const isSame = moment(accDato).isSame(moment(curDato));
            if (isSame) {
                if (dateList[moment(curDato).date()]) {
                    dateList[moment(curDato).date()].push(cur)
                } else {
                    dateList[moment(curDato).date()] = [cur];
                }
            } else {
                dateList[moment(curDato).date()] = [cur];
            }
            return cur;
        }, {});
        setDates(dateList);
    };
    console.log(dates)
    const dateFormatter = (date: any) => {
                return <div>
                    <span className='datoTekst'>{moment(date[0].datoer[0].start).format("D")}.</span>
                    <span className='datodagTekst'>{moment(date[0].datoer[0].slutt).format("dd").toUpperCase()}</span>
                </div>
 };
    const prevMonth = moment().month(currentMonth).subtract(1, 'months').endOf('month').format('MMMM');
    const nextMonth = moment().month(currentMonth).add(1, 'months').endOf('month').format('MMMM');
    return (
        <div className='main-wrapper'>
            <CalendarHeader
                currentMonth={currentMonth}
                goToNextMonth={() => setCurrentMonth(nextMonth)}
                goToPrevMonth={() => setCurrentMonth(prevMonth)}/>
            <div className="calendar-wrapper">
                {Object.keys(dates).map((key: any, i: number) => {
                    return <CalendarEntry
                        allEntries={selectedMonth}
                        key={i}
                        date={dateFormatter(dates[key])}
                        targetGroup={dates[key].map((k: any) => k.malgruppe.map((group: any, i: number) => <span key={i} className='target-group'>{group}</span>))}
                        title={dates[key].map((k: any) => <h1 className='calendar-title' key={k.tittel}>{k.tittel}</h1>)}/>
                })}
            </div>
            <CalendarFooter
                goToNextMonth={() => setCurrentMonth(nextMonth)}
                goToPrevMonth={() => setCurrentMonth(prevMonth)}/>
        </div>
    );
}

export default App;
