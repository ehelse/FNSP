import React, { useState } from 'react';

import './scss/main.scss';
import './scss/sidemenu.scss';
import { Event } from './Catalog';
import { combineFilterResults, getLengthOfArraylist, removeDuplicateFilters, knappeListeClinicalTrials, getIdFromFilter, getClinicalTrials } from './utils/fetchutils';
import { makeDictionary } from './utils/makedictionary';
import Sidemenuheader from './Sidemenuheader';
import { BottomButtons } from './bottombuttons';
import { Sidemenubutton } from './sidemenubutton';
import Paginator from './paginator';
const AriaModal = require('react-aria-modal');



const Header = (props: any) => {
    const [chooseFilter, setChooseFilter] = React.useState<any[]>([]);
    const [chosenMainFilter, setChosenMainFilter] = React.useState('');
    const [chosenSubFilter, setChosenSubFilter] = React.useState<any>(null);
    const [chosenSubFilterResult, setChosenSubFilterResult] = React.useState<any[]>([]);
    const [showChosenFilter, setShowChosenFilter] = React.useState(false);
    const [filersToUse, setFiltersToUse] = useState<any[]>(props.events)
    const [usableFilters, setUsableFilters] = useState<string[]>([]);
    const [resultSetState, setResultSetState] = useState<any>({});
    const [finalFilters, setFinalFilters] = useState<any[]>([]);
    const { setFilterOpen, filterOpen, setFilteredEvents, events, resetFilters, setResult, result } = props;
    const searchComplete = (bol: boolean) => {
        setFilterOpen(bol)
    }


    const makeKeys = knappeListeClinicalTrials && knappeListeClinicalTrials.map((listeObj: any) => (
        {
            name: listeObj.name,
            selectedFilters: [] as any,
            queryTag: listeObj.qName
        }));

    const addToFilter = chosenSubFilter && chosenSubFilter.find((obj: any) => obj.name.includes(chosenMainFilter));

    const listData = () => {
        const sortedClinical = filersToUse.sort((a: any, b: any): any => {
            return a.tittel < b.tittel ? -1 : 0
        });
        setFilteredEvents(sortedClinical);
        setChosenSubFilter(makeKeys)
    };

    React.useEffect(() => {
        listData()
    }, []);

    const openFilter = (filterList: any, title: string): any => {
        setChosenMainFilter(title);
        events.filter((listeobj: any): void => {
            const setCorrectFilters = combineFilterResults(listeobj, filterList);
            setChooseFilter((valgtFilter) => [...valgtFilter, setCorrectFilters]);
            setShowChosenFilter(true);
        })
    };
    const emptyFilter = () => {
        setChooseFilter([]);
        resetFilters();
        setResult([]);
        setChosenMainFilter('');
        setChosenSubFilterResult([]);
        setChosenSubFilter(makeKeys);
        setShowChosenFilter(false);
        searchComplete(false);
    };

    const goBack = () => {
        setChooseFilter([]);
        setChosenMainFilter('');
        setShowChosenFilter(false);
    };
    const findDuplicatesInSubObject = (resultSet: any) => {
        const finalArray: any[] = [];
        const keys = Object.keys(resultSet);
        if (keys.length === 0) return finalArray;
        else if (keys.length === 1) return resultSet[keys[0]];
        const reducedValues = keys.reduce((acc, mainFilter) => {
            let resultObject = resultSet[mainFilter];
            if (acc && acc.length) {
                return acc.filter((accResult: any) => resultObject.find((result: any) => accResult.id === result.id));
            }
            return resultObject;
        }, []);
        return reducedValues;
    }
    const chooseSubFilter = (e: any, title: string) => {
        const selectedSubFilter = { name: e.target.value, results: getLengthOfArraylist(chooseFilter, title) };
        setChosenSubFilterResult([...chosenSubFilterResult, selectedSubFilter]);
        if (addToFilter.selectedFilters.some((v: any) => v.name === selectedSubFilter.name)) {
            const filtrertListe = addToFilter.selectedFilters.filter((value: any) => value.name !== selectedSubFilter.name);
            setChosenSubFilterResult(chosenSubFilterResult.filter(r => r.name !== selectedSubFilter.name));
            if (filtrertListe.length === 0) setFiltersToUse(props.events);
            addToFilter.selectedFilters = filtrertListe;

        } else {
            if (addToFilter) addToFilter.selectedFilters.push(selectedSubFilter);
        }

        let resultSet: any = {};
        
        const flatMapAndRemoveDuplicates = (array: any[]) => {
            return array && array.length && array.flatMap(v => v).filter((value, index, self) => index === self.findIndex((t) => (t.id === value.id)));
        }

        chosenSubFilter.map((sub: any) => {
            // console.log('sub: ', sub)
            if (sub.selectedFilters.length) {
                sub.selectedFilters.map((subSel: any) => {
                    // console.log('subsel: ', subSel)
                    if(resultSet[sub.queryTag]) {
                        const eventsFilter = events.filter((res: any) => res.filterProperties.includes(subSel.name));
                        const flatMapped = flatMapAndRemoveDuplicates(eventsFilter)
                        resultSet[sub.queryTag].push(flatMapped !== 0 ? flatMapped : eventsFilter);
                    } else {
                        resultSet[sub.queryTag] = [events.filter((res: any) => res.filterProperties.includes(subSel.name))];
                    }
                    const flatMapped = flatMapAndRemoveDuplicates(resultSet[sub.queryTag]);
                    resultSet[sub.queryTag] = flatMapped !== 0 ? flatMapped : resultSet[sub.queryTag];
                })
            }
        });
        // console.log('res set: ', resultSet)
        setResultSetState(resultSet);

        const duplicateValues = findDuplicatesInSubObject(resultSet);
        console.log('duplicate: ', duplicateValues)
        setFinalFilters(duplicateValues);

    };

    const completeFilterClick = () => {
        if (numberOfResults === 0) {
            emptyFilter();
        } else {
            setResult(finalFilters)
            searchComplete(false)
        }
    }

    const disableSubFilters = (filterName: string) => {
        let found = false;
        // console.log('fitlername: ', filterName);
        // console.log('resulstate: ', resultSetState)
        const currentMainFilterList = resultSetState[addToFilter.queryTag];
        // console.log('addtofilter: ', addToFilter);
        // console.log('addtpf: ', resultSetState[addToFilter.queryTag]);
        const resultStateKeys = Object.keys(resultSetState);
        // console.log('keys: ', resultStateKeys)
        if (finalFilters.length === 0) {
            // console.log('zero len');
            return true;
        }
        if (Object.keys(resultSetState).length === 1 && resultSetState[addToFilter.queryTag] && resultSetState[addToFilter.queryTag].map((v: any) => v.filterProperties.includes(filterName))) {
            // console.log('current filter 1');
            return true;
        }
        
        return finalFilters.some((filterVal: any) => {
            return filterVal[addToFilter.queryTag].includes(filterName);
        })
        // return resultStateKeys.some((resultObject: any) => {
        //     // console.log('obj:; ', resultObject);
        //     const val = resultSetState[resultObject];
        //     return val.some((state: any) => {
        //         // console.log('state: ', state)
        //         const includes = state[addToFilter.queryTag].includes(filterName);
        //         // console.log('includes: ', includes);
        //         return includes;
        //     })
        // })
        // if (currentMainFilterList && currentMainFilterList.length) {
        //     currentMainFilterList.map((val: any) => {
        //         if (val.filterProperties.includes(filterName)) {
        //             found = true;
        //         }
        //     })
        // } else {
        //     finalFilters.map((val: any) => {
        //         if (val.filterProperties.includes(filterName)) {
        //             found = true;
        //         }
        //     })
        // }
        // return found;

    }

    // const numberOfResults = chosenSubFilterResult && chosenSubFilterResult.map((value: any) => value.results).reduce((a: any, b: any) => a + b, 0) || 0;
    const numberOfResults = finalFilters.length;
    return (
        <div className='header'>
            <h1>Kurskatalog</h1>
            <div className='ingress'>Her finner du oversikt over våre kurs og aktiviteter knyttet til våre behandlinger. <p>Kursene er tilrettelagt for deg som er pasient eller pårørende</p></div>

            <div className='filer'>
                <div className='searchfield'>
                    <input type='text' placeholder='Skriv for å filtrere...' onChange={(e) => props.setSearchValue(e)} />
                    <button type='button' value="søk" onClick={() => props.filterBySearch()}>Søk</button>
                </div>
                <div className='filterbutton'>
                    <button type='button' onClick={(e) => setFilterOpen(true)}>Filter</button>
                </div>
                <div className='komponentwrapper'>
                    {filterOpen ? <AriaModal
                        titleText="FilterModal"
                        dialogClass='komponentbakgrunn'
                        onExit={() => setFilterOpen(false)}
                        initialFocus="#close-modal-button"
                        getApplicationNode={() => document.getElementById('s4-workspace')}>
                        <div className='sidemenywrapper'>
                            <div className='menyknapper'>
                                <Sidemenuheader
                                    showChosenFilters={true}
                                    emptyFilter={() => goBack()}
                                    subfilter={'Filtrer'}
                                    hideMenu={() => searchComplete(false)}
                                />
                            </div>
                            {!showChosenFilter && knappeListeClinicalTrials && knappeListeClinicalTrials.map((obj: any, i: number): JSX.Element | null => {
                                return <Sidemenubutton
                                    title={obj.name}
                                    index={i}
                                    goToFilter={() => openFilter(makeDictionary(obj.name), obj.name)}
                                    key={obj.name + i}
                                    selectedPreview={chosenSubFilter.find((o: any) => o.name === obj.name)}
                                    isActive={true} />
                            })}
                            {showChosenFilter && removeDuplicateFilters(chooseFilter) && removeDuplicateFilters(chooseFilter).map((obj: any, i: number): JSX.Element | null => {
                                // if (usableFilters.length === 0) {
                                //     return <Sidemenubutton
                                //         isSubMenu
                                //         isSelected={addToFilter.selectedFilters.some((value: any) => value.name === obj)}
                                //         selectFilter={(e: any): any => chooseSubFilter(e, obj)}
                                //         title={obj}
                                //         key={obj + i}
                                //         subMenuResultLength={getLengthOfArraylist(chooseFilter, obj)}
                                //         isDisabled={existsinfilteredresultsokburdevaerestori()}
                                //     />
                                // } else {
                                //     if (usableFilters.includes(obj)) {
                                //         return <Sidemenubutton
                                //             isSubMenu
                                //             isSelected={addToFilter.selectedFilters.some((value: any) => value.name === obj)}
                                //             selectFilter={(e: any): any => chooseSubFilter(e, obj)}
                                //             title={obj}
                                //             key={obj + i}
                                //             subMenuResultLength={getLengthOfArraylist(chooseFilter, obj)}
                                //             isDisabled={existsinfilteredresultsokburdevaerestori()}
                                //         />
                                //     } else {
                                //         return null;
                                //     }
                                // }
                                return <Sidemenubutton
                                            isSubMenu
                                            isSelected={addToFilter.selectedFilters.some((value: any) => value.name === obj)}
                                            selectFilter={(e: any): any => chooseSubFilter(e, obj)}
                                            title={obj}
                                            key={obj + i}
                                            subMenuResultLength={getLengthOfArraylist(chooseFilter, obj)}
                                            isActive={disableSubFilters(obj)}
                                        />

                            })}
                            <BottomButtons
                                chosenSubFilter={numberOfResults}
                                removeFilters={() => emptyFilter()}
                                clickComplete={completeFilterClick}
                                // clickComplete={() => numberOfResults === 0 ? emptyFilter() : getIdFromFilter(events, chosenSubFilter, setResult, searchComplete)} 
                                />
                        </div>
                    </AriaModal> : null}

                </div>

            </div>
        </div>
    )
}

export default Header;