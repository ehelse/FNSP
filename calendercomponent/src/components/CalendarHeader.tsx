import React from 'react';
import moment from "moment";

export type CalendarHeaderProps = {
    goToNextMonth: () => void;
    currentMonth: string;
    goToPrevMonth: () => void;
}
export const CalendarHeader = ({goToPrevMonth, goToNextMonth, currentMonth}: CalendarHeaderProps): JSX.Element => {
    return <span className='calendar-header-wrapper'>
        <div className='headerwrapper'>
            <button type='button' onClick={goToPrevMonth} className='calendar-header-button'>{'<'}</button>
            <span className='currentmonth'>{currentMonth + ' ' + moment().year()}</span>
            <button type='button' onClick={goToNextMonth} className='calendar-header-button'>{'>'}</button>
        </div>
    </span>
};