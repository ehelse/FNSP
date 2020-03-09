import * as React from 'react';

const SearchBox = (): any => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    const updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    return <div className='searchbox'>
       <input className='search-field' type='text' onChange={updateSearchValue} value={searchValue}/>
       <button className='search-button' type='button'>Søk</button>
    </div>
};
export default SearchBox;