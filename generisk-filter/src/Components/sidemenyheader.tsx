import React from 'react';
import pil from '../svg/arrow-blue.svg'


export type SidemenyheaderProps = {
    visValgtefiltre: boolean;
    underfilter?: string;
    emptyFilter: () => void;
}
export const Sidemenyheader = ({ visValgtefiltre, emptyFilter, underfilter }: SidemenyheaderProps) => {
    return (
        <section className='sidemenyheader'>
            {visValgtefiltre ? <img src={pil} onClick={() => emptyFilter()} className='valg-pil-tilbake' alt='Pil'/> : null}
            <span className='meny-header-tekst'>{underfilter || 'Filtrer liste'}</span>
            <span className='lukk-kryss'>X</span>
        </section>
    )
}