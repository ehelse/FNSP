import moment from "moment";
import React from "react";

export const dateFormatter = (date: any) => {
    return <div>
        <span className='datoTekst'>{moment(date[0].datoer[0].start).format("D")}.</span>
        <span className='datodagTekst'>{moment(date[0].datoer[0].slutt).format("dd").toUpperCase()}</span>
    </div>
};

export const prevMonth = (currentMonth: any) => moment().month(currentMonth).subtract(1, 'months').endOf('month').format('MMMM');
export const nextMonth = (currentMonth: any) => moment().month(currentMonth).add(1, 'months').endOf('month').format('MMMM');
