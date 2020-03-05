import React from 'react';
import moment from "moment";

export type CalendarentryProps = {
    title: string;
    date: any;
    targetGroup: any;
}
export const CalendarEntry = ({title, date, targetGroup}: CalendarentryProps): any => {
    const dateFormatter = () => {
        const erSammeDato = moment(date?.start).format('D') === moment(date?.slutt).format('D');
        if (erSammeDato) {
            return <div>{moment(date?.start).format("D")}.
                <div>{moment(date?.start).format("dd")}</div>
            </div>
        } else {
            const startDato = date.map((d: any) => moment(d.start).format("D dd "));
            const sluttDag = date.map((d: any) => moment(d.slutt).format("D dd "));
            return <div>
                {startDato}.
                <div>{sluttDag}</div>
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