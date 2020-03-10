import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './scss/main.scss';
import dummydata from './dummydata';
import Catalog, { Event } from './Catalog';
import Header from './Header';
import Paginator from './paginator';
import { getClinicalTrials } from './utils/fetchutils';
import SearchBox from './SearchBox';

const App = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [result, setResult] = React.useState<any[]>([]);

  const resetFilters = () => {
    setFilteredEvents(dummydata);
  }
  const createExtendedArray = (data: any[]) => {
  const searchKeyProperties = ['malgruppe', 'type', 'sted', 'avdeling', 'behandling', 'behandlingsprogram'];
  const extended =  data?.map((filter: any) => {
      let filterProperties: any[] = [];
      Object.keys(filter).map(k => {
        if (searchKeyProperties.includes(k)) {
          let valueByKey = filter[k];
          filterProperties.push(valueByKey);
        }
      })
      return {...filter, filterProperties: filterProperties.flatMap(v => v).filter(v => v.length !== 0), lastOrigin: null};
  });
  return extended;
  }

  useEffect(() => {

  }, [])

  useEffect(() => {
    setFilteredEvents(createExtendedArray(dummydata));
  }, [])
  return (
    <div className='app'>
      {filteredEvents ? <Header setResult={setResult} result={result} events={filteredEvents} filterOpen={filterOpen} setFilterOpen={setFilterOpen} setFilteredEvents={setFilteredEvents} resetFilters={resetFilters} />: null}
      <div className="container">
        <div className='row'>
          {filteredEvents ? <div className={filterOpen ? 'isOpen' : 'isClosed'}>
            <Paginator
              list={result.length > 0 ? result : filteredEvents}
              resultsPerPage={50} />
          </div>: null}
        </div> 
      </div>
    </div>
  );
}

export default App;
