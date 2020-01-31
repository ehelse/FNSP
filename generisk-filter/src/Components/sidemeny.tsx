import React, { useState, useEffect } from 'react';
import '../scss/sidemeny.scss'
import { dummyFetch } from '../dummydata/dummydata';
import { SidemenyKnapp } from './sidemenyknapp';
import { renameKeys } from '../Utils/fetchutils';

export type SidemenyProps = {
    children?: any;
    tittelListe?: string[]
}

export const Sidemeny = ({ children, tittelListe }: SidemenyProps): JSX.Element => {
    const [kategorier, setkategorier] = useState<string[]>([]);
    const [status, setStatus] = useState<string[]>([]);
    const [behandlling, setBehanding] = useState<string[]>([]);
    const [studieforegar, setforegar] = useState<string[]>([]);
    const [ansvarlig, setansvarlig] = useState<string[]>([]);
    const [valgFilter, setValgtFilter] = useState<any[]>([])

    const listData = () => {
        dummyFetch.map(item => {
            return item?.kategorier.map((kategori) => {
                setkategorier(kategorier => [...kategorier, kategori])
            })
        })
    }
    useEffect(() => {
        listData()
    }, [])

    const openFilter = (filter: string): any => {
        dummyFetch.filter(liste => {
            const keys = Object.keys(liste);
            const rename = renameKeys(dummyFetch, {kategorier: 'Kategori'})
            const findValue = keys.some((value) => value === filter)
            setValgtFilter((valgFilter) => [...valgFilter, rename])
        })
    }
    console.log(valgFilter)
    return (
        <div className='sidemenywrapper'>
            <section className='sidemenyheader'>
                <span className='meny-header-tekst'>Filtrer liste</span>
                <span>X</span>
            </section>
            {tittelListe?.map((tittel: string): JSX.Element | null => {
                return <SidemenyKnapp title={tittel} goToFilter={() => openFilter(tittel)} />
            })}

        </div>
    )
}