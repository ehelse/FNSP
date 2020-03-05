import React from 'react';
import moment from "moment";

export type CalendarheaderProps = {
    currentMonth: any;
    goToNextMonth: any
    goToPrevMonth: any
}
export const CalendarHeader = ({goToPrevMonth, currentMonth, goToNextMonth}: CalendarheaderProps): JSX.Element => {
    return <span className='calendar-header-wrapper'>
        <button type='button' onClick={goToPrevMonth} className='calendar-header-button'>Forrige måned</button>
        <span className='currentmonth'>{currentMonth + ' ' + moment().year()}</span>
        <button type='button' onClick={goToNextMonth} className='calendar-header-button'>Neste måned</button>
    </span>
};