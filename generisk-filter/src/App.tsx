import React, { FC } from 'react';
import { Sidemeny } from './Components/sidemeny';
import './scss/master.scss';
import { knappeListeClinicalTrials } from './Utils/fetchutils';

const App: FC = () => {
  return (
    <div className="filtrerings-wrapper">
      <Sidemeny tittelListe={knappeListeClinicalTrials} />
    </div>
  );
}

export default App;
