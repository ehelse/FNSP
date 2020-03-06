import * as React from 'react';
import './scss/sidemenubutton.scss';

export type BottomButtonProps = {
    removeFilters: () => void;
    clickComplete: () => void;
    hits?: number;
    chosenSubFilter?: any;
}
export const BottomButtons = ({ removeFilters, clickComplete, chosenSubFilter }: BottomButtonProps) => {
    return (
        <div className='bunnknapperwrapper'>
            <span className='valg-lengde'>vis {chosenSubFilter} treff</span>
            <div className='bunnknapper'>
                <button type='button' className='button-bottom' onClick={removeFilters} aria-label='FJERN ALLE'>FJERN ALLE</button>
                <button type='button' className='button-bottom' onClick={clickComplete} aria-label='FERDIG'>FERDIG</button>
            </div>
        </div>
    )
};