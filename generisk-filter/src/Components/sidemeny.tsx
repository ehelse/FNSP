import React, { useState, useEffect } from 'react';
import '../scss/sidemeny.scss'
import { dummyFetch } from '../dummydata/dummydata';
import { SidemenyKnapp } from './sidemenyknapp';
import { combineFilterResults, removeDuplicateFilters, getLengthOfArraylist } from '../Utils/fetchutils';

export type SidemenyProps = {
    children?: any;
    tittelListe?: string[]
}

export const Sidemeny = ({ children, tittelListe }: SidemenyProps): JSX.Element => {
    const [filtre, setfiltre] = useState<string[]>([]);
    const [valgtFilter, setValgtFilter] = useState<any[]>([])
    const [visValgtefiltre, setVisValgteFiltre] = useState(false)

    const listData = () => {
        dummyFetch.map(item => {
            return item?.kategorier.map((kategori) => {
                setfiltre(filtre => [...filtre, kategori])
            })
        })
    }
    useEffect(() => {
        listData()
    }, [])

    const openFilter = (filter: string): any => {
        dummyFetch.filter((listeobj: any) => {
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
            <section className='sidemenyheader'>
                {visValgtefiltre ? <button onClick={() => emptyFilter()} className='meny-header-tekst'> Tilbake </button> : null}
                <span className='meny-header-tekst'>Filtrer liste</span>
                <span>X</span>
            </section>
            {!visValgtefiltre && tittelListe?.map((tittel: string, i: number): JSX.Element | null => {
                return <SidemenyKnapp
                    title={tittel}
                    goToFilter={() => openFilter('kategorier')}
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

        </div>
    )
}