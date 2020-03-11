import React, {useEffect} from 'react';
import moment from "moment";

export type CalendarentryProps = {
    title: string;
    allEntries: any;
    date: any;
    targetGroup: any;
}
export const CalendarEntry = ({title, date, targetGroup, allEntries}: CalendarentryProps): any => {
    const [dates, setDates] = React.useState<any[]>([]);
    const dateFormatter = () => {
        const erSammeDato = moment(date?.datoer[0].start).format('D') === moment(date?.datoer[0].slutt).format('D');
        if (erSammeDato) {
            return <div>{moment(date?.datoer[0].start).format("D")}.
                <h1>{moment(date?.datoer[0].start).format("dd")}</h1>
            </div>
        } else {
            const startDato = date?.datoer.map((d: any) => moment(d.start).format("D"));
            const sluttDag = moment(date?.datoer[0].slutt).format("dd");
            return <div>
                <span className='datoTekst'>{startDato}.</span>
                <span className='datodagTekst'>{sluttDag}</span>
            </div>

        }
    };

    const checkIfSameDates = () => {
        let dateList = {} as any;
        allEntries.length > 1 && allEntries.reduce((acc: any, cur: any) => {
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
    const mapOutDates = (): any => {
        Object.keys(dates).map((date: any, i:number): any => {
            console.log(dates[date])
         })
    };

    useEffect(() => {
        checkIfSameDates()
    }, [allEntries]);

    if (!date) {
        return null
    } else {
        return (
            <div className='entry-wrapper'>
                {dateFormatter()}
                {mapOutDates()}
                <h3>{targetGroup}</h3>
            </div>
        )
    }
};