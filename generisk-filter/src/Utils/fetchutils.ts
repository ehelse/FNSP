const apiUrl = 'https://functions-hnf2-1-02.int-hn.nhn.no/api/v1/kliniskestudier';

export const getClinicalTrials = () =>
  fetchUtility<any[]>(apiUrl, {
    method: 'GET'
  });

export const fetchUtility = <T>(
  url: string,
  options?: RequestInit
): Promise<T | null> => {
  return fetch(url, options).then((response: Response) => {
    if (!response.ok) throw new Error(response.statusText);
    if (response.status === 204) return null;

    return response.json() as Promise<T>;
  });
};

export const combineFilterResults = (listeobj: any, filter: string) => {
  if (typeof (listeobj[filter]) === 'string') {
    const stringList: any = [];
    return [...stringList, listeobj[filter]]
  } else {
    return listeobj[filter] && listeobj[filter]
      .flat()
      .reduce(((unique: any, item: string) => item && !unique.includes(item) ? [...unique, item] : unique), [])
  }
}

export const removeDuplicateFilters = (list: any) => {
  const flatList = list
    .flatMap((x: any) => x)
    .reduce(((unique: any, item: any) => item && !unique.includes(item) ? [...unique, item] : unique), [])
    .sort()
  return flatList;
}

export const getLengthOfArraylist = (list: any[], tittel: string) => {
  return list.flatMap((x: any) => x).reduce((n, val) => {
    return n + (val === tittel);
  }, 0)
}

export const getIdFromFilter = (filterListe: any[], valgteFiltre: any[], setStateCallback: (list: any[]) => any) => {
  const filterArr: any[] = []

  return filterListe.map((filter: any) => {
    valgteFiltre?.map((underFiltre: any) => {
      underFiltre.selectedFilters.map((u: any) => {
        const chosenFilters = filter[underFiltre.queryTag];
        const checkTag = typeof (chosenFilters);

        if (checkTag === 'object') {
          chosenFilters && chosenFilters.map((f: any) => {
            if (f === u.name) {
              filterArr.push({ id: filter.id, tittel: filter.tittel, goesTo: filter.lenke })
            }
          })
        } else if (checkTag === 'string' && u.name === chosenFilters) {
          filterArr.push({ id: filter.id, tittel: filter.tittel, goesTo: filter.lenke })
        }
        const filtrertListe = filterArr
          .sort((a: any, b: any): any => {
            return a.tittel < b.tittel ? -1 : 0
          })
          .filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
        setStateCallback(filtrertListe)
      })
    })
  });
}
export const knappeListeClinicalTrials = [
  { name: 'Kategori', qName: 'kategorier' },
  { name: 'Status', qName: 'status' },
  { name: 'Relevant behandling', qName: 'relaterte_behandlinger' },
  { name: 'Studien foregår ved', qName: 'deltakende_foretak' },
  { name: 'Ansvarlig helseforetak', qName: 'utfort_av' }
]