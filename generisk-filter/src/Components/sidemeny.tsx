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
    const [valgtUnderFilter, setValgtUnderFilter] = useState<any>(null)
    const [valgtUnderFilterResultat, setvalgtUnderFilterResultat] = useState<any[]>([])
    const [visValgtefiltre, setVisValgteFiltre] = useState(false)
    const makeKeys = tittelListe?.map((listeObj: string) => ({ [listeObj]: [] }))

    const listData = () => {
        getClinicalTrials().then((response: any) => setfiltre(response))
        setValgtUnderFilter(makeKeys)
    }

    useEffect(() => {
        listData()
    }, [])
    const addToFilter = valgtUnderFilter?.find((obj: any) => Object.keys(obj).includes(valgtHovedFilter));

    const openFilter = (filter: string, title: string): any => {
        setValgtHovedFilter(title)
        filtre.filter((listeobj: any): any => {
            const setCorrectFilters = combineFilterResults(listeobj, filter)
            setValgtFilter(valgtFilter => [...valgtFilter, setCorrectFilters])
            setVisValgteFiltre(true);
        })
    }

    const emptyFilter = () => {
        setValgtHovedFilter('')
        setValgtFilter([])
        setvalgtUnderFilterResultat([])
        setValgtUnderFilter(makeKeys)
        setVisValgteFiltre(false);
    }

    const chooseSubFilter = (e: any, title: string) => {
        setvalgtUnderFilterResultat([...valgtUnderFilterResultat, { name: title, results: getLengthOfArraylist(valgtFilter, title) }])

        const valg = { name: e.target.value, results: getLengthOfArraylist(valgtFilter, title) };

        if (addToFilter[valgtHovedFilter].some((v: any) => v.name === valg.name)) {
            const filtrertListe = addToFilter[valgtHovedFilter].filter((value: any) => value.name !== valg.name)
            setvalgtUnderFilterResultat(valgtUnderFilterResultat.filter(r => r.name !== valg))
            return addToFilter[valgtHovedFilter] = filtrertListe;

        } else {
            if (addToFilter) addToFilter[valgtHovedFilter].push(valg);
        }
    }
    console.log(valgtUnderFilter)
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
                        erValgt={addToFilter[valgtHovedFilter].some((value: any) => value.name === tittel)}
                        velgFilter={(e): any => chooseSubFilter(e, tittel)}
                        title={tittel}
                        key={tittel + i}
                        subMenuResultLength={getLengthOfArraylist(valgtFilter, tittel)}
                    />
                })}
            </div>
            <BunnKnapper
                valgtUnderFilter={valgtUnderFilterResultat?.map((value: any) => value.results).reduce((a: any, b: any) => a + b, 0) || 0}
                fjernFiltre={() => emptyFilter()}
                trykkFerdig={() => console.log('click')} />
        </div>
    )
}