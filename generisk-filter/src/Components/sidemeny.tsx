import React, { useState, useEffect } from 'react';
import '../scss/sidemeny.scss'
import { SidemenyKnapp } from './sidemenyknapp';
import { combineFilterResults, removeDuplicateFilters, getLengthOfArraylist, getClinicalTrials } from '../Utils/fetchutils';
import { BunnKnapper } from './bunnknapper';
import { Sidemenyheader } from './sidemenyheader';
import { kliniskestudierDictionary } from '../Utils/kliniskestudierdictionary';

export type SidemenyProps = {
    tittelListe?: string[]
    dictionary?: { [key: string]: string };
}

export const Sidemeny = ({ tittelListe }: SidemenyProps): JSX.Element => {
    const [filtre, setfiltre] = useState<any>(null);
    const [valgtFilter, setValgtFilter] = useState<any[]>([])
    const [valgtHovedFilter, setValgtHovedFilter] = useState('')
    const [valgtUnderFilter, setValgtUnderFilter] = useState<any[]>([])
    const [valgtUnderFilterResultat, setvalgtUnderFilterResultat] = useState<any[]>([])
    const [visValgtefiltre, setVisValgteFiltre] = useState(false)

    const listData = () => {
        getClinicalTrials().then((response: any) => setfiltre(response))
    }

    useEffect(() => {
        listData()
    }, [])

    const openFilter = (filter: string, title: string): any => {
        setValgtHovedFilter(title)
        filtre.filter((listeobj: any): any => {
            const setCorrectFilters = combineFilterResults(listeobj, filter)
            setValgtFilter(valgtFilter => [...valgtFilter, setCorrectFilters])
            setVisValgteFiltre(true);
        })
    }

    const emptyFilter = () => {
        setValgtFilter([])
        setValgtHovedFilter('')
        setVisValgteFiltre(false);
    }

    const chooseSubFilter = (e: any, title: string) => {
        setvalgtUnderFilterResultat([...valgtUnderFilterResultat,
        {
            name: title,
            results: getLengthOfArraylist(valgtFilter, title)
        }])
        const valg = e.target.value;
        if (valgtUnderFilter.includes(valg)) {
            const filtrertListe = valgtUnderFilter.filter(value => value !== valg);
            setValgtUnderFilter(filtrertListe)
        } else {
            setValgtUnderFilter([...valgtUnderFilter, valg])
        }
    }
    console.log(valgtUnderFilterResultat)
    return (
        <div className='sidemenywrapper'>
            <div className='menyknapper'>
                <Sidemenyheader visValgtefiltre={visValgtefiltre} emptyFilter={() => emptyFilter()} underfilter={valgtHovedFilter} />
                {!visValgtefiltre && tittelListe?.map((tittel: string, i: number): JSX.Element | null => {
                    return <SidemenyKnapp
                        title={tittel}
                        goToFilter={() => openFilter(kliniskestudierDictionary(tittel), tittel)}
                        key={tittel + i} />
                })}
                {visValgtefiltre && removeDuplicateFilters(valgtFilter)?.map((tittel: string, i: number): JSX.Element | null => {
                    return <SidemenyKnapp
                        isSubMenu
                        erValgt={valgtUnderFilter.includes(tittel)}
                        velgFilter={(e): any => chooseSubFilter(e, tittel)}
                        title={tittel}
                        key={tittel + i}
                        subMenuResultLength={getLengthOfArraylist(valgtFilter, tittel)}
                    />
                })}
            </div>
            <BunnKnapper 
            valgtUnderFilter={valgtUnderFilterResultat?.map(value => value.results).reduce((a: any, b: any) => a + b, 0)} 
            fjernFiltre={() => setValgtUnderFilter([])} 
            trykkFerdig={() => console.log('click')} />
        </div>
    )
}