import React, { useState, useEffect } from 'react';
import '../scss/sidemeny.scss'
import { SidemenyKnapp } from './sidemenyknapp';
import { combineFilterResults, removeDuplicateFilters, getLengthOfArraylist, getClinicalTrials } from '../Utils/fetchutils';
import { BunnKnapper } from './bunnknapper';
import { Sidemenyheader } from './sidemenyheader';
import { kliniskestudierDictionary } from '../Utils/kliniskestudierdictionary';

export type SidemenyProps = {
    tittelListe?: string[]
    dictionary?:{ [key: string]: string };
}

export const Sidemeny = ({ tittelListe }: SidemenyProps): JSX.Element => {
    const [filtre, setfiltre] = useState<any>(null);
    const [valgtFilter, setValgtFilter] = useState<any[]>([])
    const [visValgtefiltre, setVisValgteFiltre] = useState(false)

    const listData = () => {
        getClinicalTrials().then((response: any) => setfiltre(response))
    }
    useEffect(() => {
        listData()
    }, [])

    const openFilter = (filter: string): any => {
        filtre.filter((listeobj: any) => {
            const setCorrectFilters = combineFilterResults(listeobj, filter)
            setValgtFilter(valgtFilter => [...valgtFilter, setCorrectFilters])
            setVisValgteFiltre(true);
        })
    }
    const emptyFilter = () => {
        setValgtFilter([])
        setVisValgteFiltre(false);
    }
    return (
        <div className='sidemenywrapper'>
            <Sidemenyheader visValgtefiltre={visValgtefiltre} emptyFilter={() => emptyFilter()}/>
            {!visValgtefiltre && tittelListe?.map((tittel: string, i: number): JSX.Element | null => {
                return <SidemenyKnapp
                    title={tittel}
                    goToFilter={() => openFilter(kliniskestudierDictionary(tittel))}
                    key={tittel + i} />
            })}
            {visValgtefiltre && removeDuplicateFilters(valgtFilter)?.map((tittel: string, i: number): JSX.Element | null => {
                return <SidemenyKnapp
                    isSubMenu
                    title={tittel}
                    key={tittel + i}
                    subMenuResultLength={getLengthOfArraylist(valgtFilter, tittel)}
                />
            })}
            <span>vis {filtre?.length} treff</span>
            <BunnKnapper fjernFiltre={() => console.log('filtre fjernet')} trykkFerdig={() => console.log('ferdig med valg')} />
        </div>
    )
}