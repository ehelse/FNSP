import React from 'react';
import '../scss/fakeradio.scss';
import checkMark from '../svg/CheckNy.svg';

export type FakeRadioKnappProps = {
    check: boolean
}
export const FakeRadioKnapp = ({ check }: FakeRadioKnappProps) => {
    return <div className='fakeradio'>{check ? <img src={checkMark} alt='check' /> : null}</div>
}