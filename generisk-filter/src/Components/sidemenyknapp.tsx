import React from 'react';
import '../scss/sidemenyknapp.scss';

export type SidemenyKnappProps = {
    title: string;
    subMenuResultLength?: number;
    isSubMenu?: boolean;
    goToFilter?: (filterName: any) => string[]
}
export const SidemenyKnapp = ({ title, goToFilter, isSubMenu, subMenuResultLength }: SidemenyKnappProps): JSX.Element => {
    return (
        <span className='knapp-wrapper'>
            <span className='button-title'>
                {isSubMenu ? <input type='checkbox' className='checkbox-input' /> : null}
                <button
                    className='sidemeny-knapp'
                    onClick={goToFilter}>
                    {title}
                </button>
            </span>
            {isSubMenu ? null : <img src='test' />}
            {isSubMenu ? <span>{subMenuResultLength}</span> : null}
        </span>
    )
}