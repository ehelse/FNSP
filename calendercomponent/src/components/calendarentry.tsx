import React from 'react';
import moment from "moment";

export type CalendarentryProps = {
    title: any;
    allEntries: any;
    date: any;
    targetGroup: any;
}
export const CalendarEntry = ({title, date, targetGroup}: CalendarentryProps): any => {
        if (!date) {
            return null
        } else {
            return (
                <div className='entry-wrapper'>
                    {date}
                    {title}
                    <h3>{targetGroup}</h3>
                </div>
            )
        }
    }
;