import * as React from 'react';
import './scss/fakeradio.scss';

export type FakeRadioButtonProps = {
    check: boolean;
    disabled: boolean;
}
export const FakeRadioButton = ({ check, disabled }: FakeRadioButtonProps) => {
    return <div className={`fakeradio${disabled ? ' disabled' : ''}`}>{check ? <button type='button' className='checkmark'/> : null}</div>
};