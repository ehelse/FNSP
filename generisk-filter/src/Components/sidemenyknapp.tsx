import React from 'react';
import '../scss/sidemenyknapp.scss';
import pil from '../svg/arrow-blue.svg'

export type SidemenyKnappProps = {
    title: string;
    subMenuResultLength?: number;
    isSubMenu?: boolean;
    erValgt?: any;
    goToFilter?: (filterName: any) => string[];
    velgFilter?: (filterName: any) => string[];
}
export const SidemenyKnapp = ({erValgt, title, goToFilter, isSubMenu, subMenuResultLength, velgFilter }: SidemenyKnappProps): JSX.Element => {
    return (
        <span className='knapp-wrapper'>
            <span className='button-title'>
                {isSubMenu ? <input type='checkbox' checked={erValgt} value={title} onChange={velgFilter} className='checkbox-input' /> : null}
                <button
                    className='sidemeny-knapp'
                    onClick={goToFilter}>
                    {title}
                </button>
            </span>
            {isSubMenu ? null : <img src={pil} className='valg-pil' alt='Pil'/>}
            {isSubMenu ? <span>{subMenuResultLength}</span> : null}
        </span>
    )
}