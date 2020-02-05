import React from 'react';
import '../scss/sidemenyknapp.scss';

export type BunnKnapperProps = {
    fjernFiltre: () => void;
    trykkFerdig: () => void;
    treff?: number;
    valgtUnderFilter?: any;
}
export const BunnKnapper = ({ fjernFiltre, trykkFerdig, valgtUnderFilter }: BunnKnapperProps) => {
    return (
        <div className='bunnknapperwrapper'>
            <span className='valg-lengde'>vis {valgtUnderFilter} treff</span>
            <div className='bunnknapper'>
                <button className='button-bottom' onClick={fjernFiltre}>FJERN ALLE</button>
                <button className='button-bottom' onClick={trykkFerdig}>FERDIG</button>
            </div>
        </div>
    )
}