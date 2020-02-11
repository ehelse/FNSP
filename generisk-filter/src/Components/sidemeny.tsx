import React, { useState, useEffect } from 'react';
import '../scss/sidemeny.scss'
import { SidemenyKnapp } from './sidemenyknapp';
import { combineFilterResults, removeDuplicateFilters, getLengthOfArraylist, getClinicalTrials, getIdFromFilter } from '../Utils/fetchutils';
import { BunnKnapper } from './bunnknapper';
import { Sidemenyheader } from './sidemenyheader';
import { kliniskestudierDictionary } from '../Utils/kliniskestudierdictionary';

export type SidemenyProps = {
    tittelListe?: any[]
    dictionary?: { [key: string]: string };
}

export const Sidemeny = ({ tittelListe }: SidemenyProps): JSX.Element => {
    const [filtre, setfiltre] = useState<any>(null);
    const [valgtFilter, setValgtFilter] = useState<any[]>([])
    const [valgtHovedFilter, setValgtHovedFilter] = useState('')
    const [valgtUnderFilter, setValgtUnderFilter] = useState<any>(null)
    const [valgtUnderFilterResultat, setvalgtUnderFilterResultat] = useState<any[]>([])
    const [resultat, setResultat] = useState<any[]>([])
    const [visValgtefiltre, setVisValgteFiltre] = useState(false)

    const makeKeys = tittelListe?.map((listeObj: any) => (
        {
            name: listeObj.name,
            selectedFilters: [],
            queryTag: listeObj.qName
        }))

    const addToFilter = valgtUnderFilter?.find((obj: any) => obj.name.includes(valgtHovedFilter));

    const listData = () => {
        getClinicalTrials().then((response: any) => setfiltre(response))
        setValgtUnderFilter(makeKeys)
    }

    useEffect(() => {
        listData()
    }, [])

    const openFilter = (filter: string, title: string): any => {
        setValgtHovedFilter(title)
        filtre.filter((listeobj: any): void => {
            const setCorrectFilters = combineFilterResults(listeobj, filter)
            setValgtFilter(valgtFilter => [...valgtFilter, setCorrectFilters])
            setVisValgteFiltre(true);
        })
    }

    const emptyFilter = () => {
        setValgtFilter([])
        setResultat([])
        setValgtHovedFilter('')
        setvalgtUnderFilterResultat([])
        setValgtUnderFilter(makeKeys)
        setVisValgteFiltre(false);
    }

    const goBack = () => {
        setValgtFilter([])
        setValgtHovedFilter('')
        setVisValgteFiltre(false);
    }

    const chooseSubFilter = (e: any, title: string) => {
        setvalgtUnderFilterResultat([...valgtUnderFilterResultat, { name: title, results: getLengthOfArraylist(valgtFilter, title) }])

        const valg = { name: e.target.value, results: getLengthOfArraylist(valgtFilter, title) };

        if (addToFilter.selectedFilters.some((v: any) => v.name === valg.name)) {
            const filtrertListe = addToFilter.selectedFilters.filter((value: any) => value.name !== valg.name)
            setvalgtUnderFilterResultat(valgtUnderFilterResultat.filter(r => r.name !== valg.name))
            return addToFilter.selectedFilters = filtrertListe;

        } else {
            if (addToFilter) addToFilter.selectedFilters.push(valg);
        }
    }
  
    console.log(resultat)
    return (
        <div className='komponentwrapper'>
            <div className='sidemenywrapper'>
                <div className='menyknapper'>
                    <Sidemenyheader visValgtefiltre={visValgtefiltre} emptyFilter={() => goBack()} underfilter={valgtHovedFilter} />
                    {!visValgtefiltre && tittelListe?.map((obj: any, i: number): JSX.Element | null => {
                        return <SidemenyKnapp
                            title={obj.name}
                            goToFilter={() => openFilter(kliniskestudierDictionary(obj.name), obj.name)}
                            key={obj.name + i} />
                    })}
                    {visValgtefiltre && removeDuplicateFilters(valgtFilter)?.map((obj: any, i: number): JSX.Element | null => {
                        return <SidemenyKnapp
                            isSubMenu
                            erValgt={addToFilter.selectedFilters.some((value: any) => value.name === obj)}
                            velgFilter={(e): any => chooseSubFilter(e, obj)}
                            title={obj}
                            key={obj + i}
                            subMenuResultLength={getLengthOfArraylist(valgtFilter, obj)}
                        />
                    })}
                </div>
                <BunnKnapper
                    valgtUnderFilter={valgtUnderFilterResultat?.map((value: any) => value.results).reduce((a: any, b: any) => a + b, 0) || 0}
                    fjernFiltre={() => emptyFilter()}
                    trykkFerdig={() => getIdFromFilter(filtre, valgtUnderFilter, setResultat)} />
            </div>
            <div className={resultat.length > 0 ? 'resultatwrapper' : ''}>
                {resultat?.map((res: any, i: number) => {
                    return <a href={res.goesTo} target='_blank' className='resultat' key={i}>{res.tittel}</a>
                })}
            </div>
        </div>
    )
}