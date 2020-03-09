const rootUrl = 'https://functions-fnsp.hn.test.nhn.no'; //API TEST

export const getClinicalTrials = () =>
  fetchUtility<any[]>(rootUrl, {
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
      .reduce(((unique: any, item: string) => item && !unique.includes(item) ? unique.concat(item) : unique), [])
  }
};

export const removeDuplicateFilters = (list: any) => {
  return list
      .flatMap((x: any) => x)
      .reduce(((unique: any, item: any) => item && !unique.includes(item) ? unique.concat(item) : unique), [])
      .sort();
};

export const getLengthOfArraylist = (list: any, tittel: string) => {
  return list.flatMap((x: any) => x).reduce((n: any, val: any) => {
    return n + (val === tittel);
  }, 0)
};

export const getIdFromFilter = (filterListe: any[], valgteFiltre: any[], setStateCallback: (list: any[]) => any, fjernMeny: (isRemoved: boolean) => void) => {
  const filterArr: any[] = [];

  return filterListe.map((filter: any) => {
    // console.log('filter: ', filter)
    valgteFiltre && valgteFiltre.map((underFiltre: any) => {
      // console.log('underfiltre: ', underFiltre);
      underFiltre.selectedFilters.map((u: any) => {
        // console.log('u: ', u)
        const chosenFilters = filter[underFiltre.queryTag];
        const checkTag = typeof (chosenFilters);

        if (checkTag === 'object') {
          chosenFilters && chosenFilters.map((f: any) => {
            if (f === u.name) {
              // filterArr.push({ id: filter.id, tittel: filter.tittel, goesTo: filter.lenke })
              console.log('f1', f)
              filterArr.push({ tittel:  filter.tittel, malgruppe: filter.malgruppe, sted: filter.sted, type: filter.type, behandling: filter.behandling, behandlingsprogram: filter.behandlingsprogram, datoer: filter.datoer, id: filter.id})

            }
          })
        } else if (checkTag === 'string' && u.name === chosenFilters) {
          // filterArr.push({ id: filter.id, tittel: filter.tittel, goesTo: filter.lenke })
          console.log('f2', filter)
          filterArr.push({ tittel:  filter.tittel, malgruppe: filter.malgruppe, sted: filter.sted, type: filter.type, behandling: filter.behandling, behandlingsprogram: filter.behandlingsprogram, datoer: filter.datoer, id: filter.id})
        }
        const filtrertListe = filterArr
          .sort((a: any, b: any): any => {
            return a.tittel < b.tittel ? -1 : 0
          });
        setStateCallback(filtrertListe);
        fjernMeny(false)
      })
    })
  });
};

export const knappeListeClinicalTrials = [
  { name: 'Målgruppe', qName: 'malgruppe' },
  { name: 'Type', qName: 'type' },
  { name: 'Sted', qName: 'sted' },
  { name: 'Behandling', qName: 'behandling' },
  { name: 'Behandlingsprogram', qName: 'behandlingsprogram' }
];