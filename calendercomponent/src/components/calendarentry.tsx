import React from 'react';
import moment from "moment";

export type CalendarentryProps = {
    title: string;
    allEntries: any;
    date: any;
    targetGroup: any;
}
export const CalendarEntry = ({title, date, targetGroup, allEntries}: CalendarentryProps): any => {
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
    if (!date) {
        return null
    } else {
        return (
            <div className='entry-wrapper'>
                {dateFormatter()}
                <h1>{title}</h1>
                <h3>{targetGroup}</h3>
            </div>
        )
    }
};