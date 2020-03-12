import React from 'react';

export type CalendarFooterProps = {
    goToNextMonth: () => void;
    goToPrevMonth: () => void;
}
export const CalendarFooter = ({goToPrevMonth, goToNextMonth}: CalendarFooterProps): JSX.Element => {
    return <span className='calendar-footer-wrapper'>
        <button type='button' onClick={goToPrevMonth} className='calendar-footer-button'>Forrige måned</button>
        <button type='button' onClick={goToNextMonth} className='calendar-footer-button'>Neste måned</button>
    </span>
};