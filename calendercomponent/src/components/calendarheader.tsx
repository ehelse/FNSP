import React from 'react';

export type CalendarheaderProps = {
    lastMonth?: () => void;
    currentMonth: any;
    nextMonth?: () => void
}
export const CalendarHeader = ({lastMonth, currentMonth, nextMonth}: CalendarheaderProps): JSX.Element => {
    return <span className='calendar-header-wrapper'>
        <button className='calendar-header-button'>Forrige måned</button>
        <span className='currentmonth'>{currentMonth}</span>
        <button className='calendar-header-button'>Neste måned</button>
    </span>
};