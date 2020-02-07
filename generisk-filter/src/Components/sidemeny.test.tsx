import React from 'react';
import { Sidemeny } from '../Components/sidemeny';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


it('Should add choice to correct array ', () => {
    const setHookState = (filtre: {}) => jest.fn().mockImplementation((state: {}) => [
        filtre,
        (newState: {}) => { }
    ])
    const SidemenyProps = {
        tittelListe: ['Kategori', 'Status', 'Relevant behandling', 'Studien foregår ved', 'Ansvarlig helseforetak']
    }
    setHookState({ filtre: [{ katagorier: ['Annet'] }]})
    const wrapper = shallow(<Sidemeny tittelListe={SidemenyProps.tittelListe} />)
    const e = { target: { value: 'annet' } }
    wrapper.find('SidemenyKnapp').at(0).props().goToFilter('Kategori', 'Kategori')
    wrapper.find('SidemenyKnapp').at(1).props().velgFilter('Kategori', e)
    expect(wrapper.length).toEqual(1)
})