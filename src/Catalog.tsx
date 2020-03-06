import React, { useEffect, useState } from 'react';
import './scss/main.scss';

export interface Dato {
    start: string;
    slutt: string;
}
export interface Event {
    id: number;
    tittel: string;
    malgruppe: string[];
    type: string,
    sted: string;
    avdeling: string;
    datoer: Dato[];
    behandling: string,
    behandlingsprogram: string;
}

export interface CatalogProps {
    events: Event[];
}


const Catalog = (props: CatalogProps) => {
    const {events} = props;
    const [groupedEvents, setGroupedEvents] = useState<any>({});
    const getCreateTags = (event: Event) => {
        return [event.behandling, event.behandlingsprogram, event.type, event.sted, event.malgruppe].flatMap(f => f);
    }
    const orderedClinicalTrials: any = {};

    const getGroupedByTreatment = () => {
        const result = events.reduce((r, a) => {
            if (a.behandlingsprogram.length === 0 && a.behandling.length !== 0) {
                r[a.behandling] = r[a.behandling] || [];
                r[a.behandling].push(a);
            } else if (a.behandlingsprogram.length !== 0 && a.behandling.length === 0) {
                r[a.behandlingsprogram] = r[a.behandlingsprogram] || [];
                r[a.behandlingsprogram].push(a);
            }
            return r;
        }, Object.create(null));
        Object.keys(result).forEach((key) => {
            orderedClinicalTrials[key] = result[key]
        });
        // console.log('ordered:; ', orderedClinicalTrials)
        setGroupedEvents(orderedClinicalTrials);
    }

    useEffect(() => {
        getGroupedByTreatment();
    }, [events])

    return (
        <div className='catalog'>
            {/* <ul>
            {events.map((event, index) => (
                <li key={index} className='event'>
                    <div className='title'>{event.tittel}</div>
                    <div className='tags'>
                        {getCreateTags(event).map(tag => tag? (<span className="tag" key={tag}>{tag}</span>) : null)}
                    </div>
                </li>
            ))}
            </ul> */}
            <ul>
            {Object.keys(groupedEvents).length ? Object.keys(groupedEvents).map((k, index) => {
                return <div key={index} style={{marginBottom: '4rem'}}>
                        <div style={{fontSize: '1.25rem', textTransform: 'uppercase', marginBottom: '.5rem'}}>{k}</div>
                            <ul>{groupedEvents[k].map((ev: any, i: number) => 
                                (<li key={i} className='event'>
                                    <div className='date'>{ev.datoer.length === 0 ? 'Nettkurs' :  new Date(ev.datoer[0].start).toLocaleDateString()}</div>
                                    <div className='item'><div className='title'>{ev.tittel}</div>
                                <div className='tags'>
                                    {getCreateTags(ev).map(tag => tag? (<span className="tag" key={tag}>{tag}</span>) : null)}
                                </div></div>
                                
                            </li>)
                                )}
                            </ul>
                        </div>}) : null}
            </ul>
        </div>
    )
}

export default Catalog;