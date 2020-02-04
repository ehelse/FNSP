import React from 'react';

export type BunnKnapperProps = {
    fjernFiltre: () => void;
    trykkFerdig: () => void;
    treff?: number;
}
export const BunnKnapper = ({fjernFiltre, trykkFerdig, treff}: BunnKnapperProps) => {
    return (
        <div className='bunnknapperwrapper'>
            <button onClick={fjernFiltre}>Fjern filtre</button>
            <button onClick={trykkFerdig}>Ferdig</button>
        </div>
    )
}