import React from 'react';
import '../scss/sidemenyknapp.scss';

export type SidemenyKnappProps = {
    title: string;
    goToFilter: (filterName: any) => string[]
}
export const SidemenyKnapp = ({ title, goToFilter }: SidemenyKnappProps): JSX.Element => {
    return (
        <span className='knapp-wrapper'>
            <button
                className='sidemeny-knapp'
                onClick={goToFilter}>
                {title}
            </button>
            <img src='test' />
        </span>
    )
}