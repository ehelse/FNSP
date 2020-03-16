import React from 'react';

export type CalendarentryProps = {
    title: any;
    date: any;
}
export const CalendarEntry = ({title, date}: CalendarentryProps): any => {
        if (!date) {
            return null
        } else {
            return (
                <div className='entry-wrapper'>
                    {date}
                    {title}
                </div>
            )
        }
    }
;