import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './scss/main.scss';
import dummydata from './dummydata';
import Catalog, { Event } from './Catalog';
import Header from './Header';
import Paginator from './paginator';
import { getClinicalTrials } from './utils/fetchutils';

const App = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[] | null>(null);
  const [typedFilter, setTypeFilter] = useState<Event[]>(dummydata);
  const [mergedEvents, setMergedEvents] = useState<Event[] | null>(null);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [result, setResult] = React.useState<any[]>([]);

  const filterEvents = (e: any) => {
    // console.log('change: ', e.target.value)
    let filtered = typedFilter && typedFilter.filter(d => d.tittel.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    console.log(filtered)
    setTypeFilter(filtered)
    mergeArrays();
  }
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
  //   getClinicalTrials().then((response: any) => setFilteredEvents(createExtendedArray(response.sort((a: any, b: any): any => {
  //     return a.tittel < b.tittel ? -1 : 0
  // }))));
  setFilteredEvents(createExtendedArray(dummydata));
  }, [])
  const filterBySearch = () => {
    if (searchValue === '') resetFilters()
    else {
      let filtered = dummydata && dummydata.filter(d => d.tittel.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      setFilteredEvents(filtered)
    }
    
  }
  const setValueFromSearchField = (e: any) => setSearchValue(e.target.value);
  const mergeArrays = () => {
    const reduced = filteredEvents?.filter(a => !typedFilter.find(f => a.id === f.id)).concat(typedFilter);
    // setMergedEvents(reduced);
  }
  return (
    <div className='app'>
      {filteredEvents ? <Header setResult={setResult} result={result} events={filteredEvents} filterEvents={filterEvents} filterOpen={filterOpen} setFilterOpen={setFilterOpen} setFilteredEvents={setFilteredEvents} resetFilters={resetFilters} setSearchValue={setValueFromSearchField} filterBySearch={filterBySearch} />: null}
      <div className="container">
        <div className='row'>
          <h2>Prototypeapplikasjon for arrangementer - kurskatalog</h2>
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
