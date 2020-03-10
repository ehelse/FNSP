import * as React from 'react';

interface SearchBoxProps {
    placeholder?: string;
    onSearch: (value: string) => void;
}

const SearchBox = ({placeholder, onSearch}: SearchBoxProps): any => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    const updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') onSearch(searchValue);
    }
    const handleSearchClick = (e: React.MouseEvent) => {
        onSearch(searchValue);
    }
    return <div className='searchbox'>
       <input className='search-field' placeholder={placeholder || 'Søk'} type='text' onKeyDown={handleKeyDown} onChange={updateSearchValue} value={searchValue}/>
       <button className='search-button' type='button' onClick={handleSearchClick}>Søk</button>
    </div>
};
export default SearchBox;