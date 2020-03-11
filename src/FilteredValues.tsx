import * as React from 'react';

interface FilteredValuesProps {
    values: any[];
    onRemoveFilterClick: (title: string) => void;
}
const FilteredValues = ({values, onRemoveFilterClick}: FilteredValuesProps): any => {
    const [filterValues, setFilterValues] = React.useState<any[]>([]);
    // console.log('v: ', values)
    // const reduced = values.reduce((acc, cur) => {
    //     if (cur.selectedFilters) {
    //         cur.selectedFilters.map((f: any) => acc.push(f.name))
    //     }
    //     return acc;
    // }, []);
    const removeFilter = (title: string) => {
        onRemoveFilterClick(title);
    }
    return <>{values && values.length ? <div className='selected-filters'>
        <span>Valgte filtre: </span>
        <ul className='filtered-items'>
        {/* {values.map((value: any, index: number) => 
            value.selectedFilters && value.selectedFilters.length ? <li key={index} style={{maxWidth: '250px', display: 'flex', flexDirection: 'row', margin: '0 1rem'}}>
                {value.selectedFilters.map((f: any, i: number) => 
                    <div style={{border: '1px solid lightgray', backgroundColor: '#fff', display: 'flex', padding: '.5rem', justifyContent: 'space-between', margin: '0 1rem'}} key={i}><span>{value.name}: {f.name}</span><button type="button">X</button></div>
                )}
            </li> : null
        )} */}
        {values.map((value: any, index: number) => 
            <li className='item' key={index}><span>{value.name}</span><button type="button" onClick={() => removeFilter(value.name)} aria-label='Fjern filter'></button></li>
        )}
    </ul></div> : null}</>
};
export default FilteredValues;