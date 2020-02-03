export const fetcher = () => {

}

export const combineFilterResults = (listeobj: any, filter: string) => {
    const combinedListe = listeobj[filter]
        .flat()
        .reduce(((unique: any, item: string) => item && !unique.includes(item) ? [...unique, item] : unique), [])
    return combinedListe

}

export const removeDuplicateFilters = (list: any) => {
    const flatList = list
        .flatMap((x: any) => x)
        .reduce(((unique: any, item: string) => item && !unique.includes(item) ? [...unique, item] : unique), [])
        .sort()
    return flatList;
}

export const getLengthOfArraylist = (list: any[], tittel: string) => {
    return list.flatMap((x: any) => x).reduce((n, val) => {
        return n + (val === tittel);
    }, 0)
}

export const knappeListe = [
    'Kategori',
    'Status',
    'Relevant behandling',
    'Studien foregår ved',
    'Ansvarlig helseforetak'
]