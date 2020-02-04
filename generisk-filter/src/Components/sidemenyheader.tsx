import React from 'react';

export type SidemenyheaderProps = {
    visValgtefiltre: boolean;
    emptyFilter: () => void;
}
export const Sidemenyheader = ({visValgtefiltre, emptyFilter}: SidemenyheaderProps) => {
    return(
        <section className='sidemenyheader'>
                {visValgtefiltre ? <button onClick={() => emptyFilter()} className='meny-header-tekst'> Tilbake </button> : null}
                <span className='meny-header-tekst'>Filtrer liste</span>
                <span>X</span>
            </section>
    )
}