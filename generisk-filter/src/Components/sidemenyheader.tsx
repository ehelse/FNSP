import React from 'react';

export type SidemenyheaderProps = {
    visValgtefiltre: boolean;
    underfilter?: string;
    emptyFilter: () => void;
}
export const Sidemenyheader = ({visValgtefiltre, emptyFilter, underfilter}: SidemenyheaderProps) => {
    return(
        <section className='sidemenyheader'>
                {visValgtefiltre ? <button onClick={() => emptyFilter()} className='tilbakeknapp'> Tilbake </button> : null}
    <span className='meny-header-tekst'>{underfilter ||'Filtrer liste'}</span>
                <span className='lukk-kryss'>X</span>
            </section>
    )
}