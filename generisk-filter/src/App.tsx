import React, { FC } from 'react';
import { Sidemeny } from './Components/sidemeny';
import './scss/master.scss';
import { knappeListe } from './Utils/fetchutils';

const App: FC = () => {
  return (
    <div className="filtrerings-wrapper">
      <Sidemeny tittelListe={knappeListe} />
    </div>
  );
}

export default App;
