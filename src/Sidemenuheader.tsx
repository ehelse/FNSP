import * as React from 'react';

export type SidemenuheaderProps = {
    showChosenFilters: boolean;
    subfilter?: string;
    emptyFilter: () => void;
    hideMenu: () => void;
}
const Sidemenuheader = ({ showChosenFilters, emptyFilter, subfilter, hideMenu }: SidemenuheaderProps) => {
    document.body.style.overflow ='hidden';

    return (
        <section className='sidemenyheader'>
            {showChosenFilters ? <label onClick={() => emptyFilter()} className='valg-pil-tilbake'/> : null}
            <span className='meny-header-tekst'>{subfilter || 'Filtrer liste'}</span>
            <button className='lukk-kryss' id="close-modal-button" type='button' onClick={() => hideMenu()} aria-label='lukke kryss' />
        </section>
    )
};

export default Sidemenuheader;