export const fetcher = () => {

}

export const renameKeys = (list: any[], newKeys: any) => {
    list.map((listItem: any) => {
        const keyValues = Object.keys(listItem).map(key => {
            const newKey = newKeys[key] || key;
            return {[newKey]: listItem[key]}
        })
        return [...list, keyValues];
    })
}

export const knappeListe = [
    'Kategori',
    'Status',
    'Relevant behandling',
    'Studien foregår ved',
    'Ansvarlig helseforetak'
]