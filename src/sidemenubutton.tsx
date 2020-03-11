import * as React from 'react';
import './scss/sidemenubutton.scss';
import { FakeRadioButton } from './fakeRadioButton';

export type SidemenuButtonProps = {
    title: string;
    subMenuResultLength?: number;
    index?: number;
    selectedPreview?: any;
    isSubMenu?: boolean;
    isSelected?: any;
    goToFilter?: (filterName: any) => string[];
    selectFilter?: (filterName: any) => void;
    isActive: boolean;
}
export const Sidemenubutton = ({ index, isSelected, title, goToFilter, isSubMenu, subMenuResultLength, selectFilter, selectedPreview, isActive }: SidemenuButtonProps): JSX.Element => {

    return (
        <span className='knapp-wrapper'  onClick={goToFilter}>
            <span className='button-title'>
                {isSubMenu ? <div className={`side-meny-input-wrapper${!isActive ? ' disabled' : ''}`}>
                    <FakeRadioButton check={isSelected} disabled={!isActive}/>
                    <input type='checkbox' id={title} checked={isSelected} value={title} onChange={selectFilter} className='checkbox-input' disabled={!isActive}/>
                    <label id={`side-menu-${index}`} className='sidemeny-label' htmlFor={title}>{title}</label>
                </div> : null}
                {isSubMenu ? null : <button id={`side-menu${index}`} className='sidemeny-knapp'>{title}</button>}
            </span>
            <span className='previewtekst' key={title}>
                {selectedPreview && selectedPreview.selectedFilters.map((valg: any) => selectedPreview && selectedPreview.selectedFilters.length > 1 ? valg.name + ' , ' : valg.name)}
            </span>
            {isSubMenu ? null : <label className='valg-pil' tabIndex={-1} />}
            {isSubMenu && isActive ? <span>{subMenuResultLength}</span> : null}
        </span>
    )
};