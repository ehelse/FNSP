export const getClinicalTrials = () =>
  fetchUtility<any[]>('https://functions-hnf2-1-02.int-hn.nhn.no/api/v1/kliniskestudier', {
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