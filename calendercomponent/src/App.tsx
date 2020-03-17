import React from 'react';
import './App.scss';
import {CalendarEntry} from "./components/calendarentry";
import {dummydata} from "./dummydata";
import {CalendarFooter} from "./components/calendarFooter";
import moment from 'moment'
import 'moment/locale/nb'
import {CalendarHeader} from "./components/CalendarHeader";
import {dateFormatter, nextMonth, prevMonth} from "./utils/dateutils";

moment.locale('nb');

function App() {
    const [currentMonth, setCurrentMonth] = React.useState('');
    const [dates, setDates] = React.useState<any[]>([]);

    const list = {} as any;

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
        checkIfSameDates();
    }, [currentMonth]);


    const checkIfSameDates = () => {
        let dateList = {} as any;
        list[currentMonth] && list[currentMonth].reduce((acc: any, cur: any) => {
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

    return (
        <div className='main-wrapper'>
            <div className='headertext'>
                <div className='calendertitle'>Kalender</div>
                <span className='descriptiontext'>Dette er en oversikt over alle hendelser med dato.
                Ønsker du å se alle kurs og nettkurs? Gå til kurskatalogen for pasienter og pårørende eller kurskatalogen for helsepersonell</span>
            </div>
            <CalendarHeader
                currentMonth={currentMonth}
                goToNextMonth={() => setCurrentMonth(nextMonth(currentMonth))}
                goToPrevMonth={() => setCurrentMonth(prevMonth(currentMonth))}/>
            <div className="calendar-wrapper">
                {Object.keys(dates).length > 0 ? Object.keys(dates).map((key: any, i: number) => {
                    return <CalendarEntry
                        key={i}
                        date={dateFormatter(dates[key])}
                        title={dates[key].map((k: any, i: number) => <div key={i} className='titletarget'>
                            <h1 className='calendar-title' key={k.tittel}>{k.tittel}</h1>
                            {k.malgruppe.map((group: any, i: number) => <span key={i}
                                                                              className='target-group'>{group}</span>)}
                        </div>)}/>
                }) : <h1>Helt tomt her</h1>}
            </div>
            <CalendarFooter
                goToNextMonth={() => setCurrentMonth(nextMonth)}
                goToPrevMonth={() => setCurrentMonth(prevMonth)}/>
        </div>
    );
}

export default App;
