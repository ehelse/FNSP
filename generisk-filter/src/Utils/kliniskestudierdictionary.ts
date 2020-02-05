import { Dictionary } from "./dictionary";

export function kliniskestudierDictionary(query: any) {
    let ordbok = new Dictionary<any>()
    ordbok.Add('Kategori', { norsk: 'Kategori', searchQuery: 'kategorier' })
    ordbok.Add('Status', { norsk: 'Status', searchQuery: 'status' })
    ordbok.Add('Relevant behandling', { norsk: 'Relevant behandling', searchQuery: 'relaterte_behandlinger' })
    ordbok.Add('Studien foregår ved', { norsk: 'Studien foregår ved', searchQuery: 'deltakende_foretak' })
    ordbok.Add('Ansvarlig helseforetak', { norsk: 'Ansvarlig helseforetak', searchQuery: 'utfort_av' })
    return ordbok.Item(query).searchQuery
}