import * as React from 'react';

interface SearchBoxProps {
    placeholder?: string;
}

const SearchBox = ({placeholder}: SearchBoxProps): any => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    const updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    return <div className='searchbox'>
       <input className='search-field' placeholder={placeholder || 'Søk'} type='text' onChange={updateSearchValue} value={searchValue}/>
       <button className='search-button' type='button'>Søk</button>
    </div>
};
export default SearchBox;