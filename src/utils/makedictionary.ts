import { Dictionary } from "./dictionary";

export function makeDictionary(query: any) {
    let ordbok = new Dictionary<any>();
    ordbok.Add('Målgruppe', { norsk: 'Kategori', searchQuery: 'malgruppe' });
    ordbok.Add('Type', { norsk: 'Status', searchQuery: 'type' });
    ordbok.Add('Sted', { norsk: 'Relevant behandling', searchQuery: 'sted' });
    ordbok.Add('Behandling', { norsk: 'Studien foregår ved', searchQuery: 'behandling' });
    ordbok.Add('Behandlingsprogram', { norsk: 'Ansvarlig helseforetak', searchQuery: 'behandlingsprogram' });
    return ordbok.Item(query).searchQuery
}
