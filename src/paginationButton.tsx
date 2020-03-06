import * as React from 'react';

type PaginationButtonProps = {
    i: number;
    activePage?: number;
    setActivePage: (i: number) => void
}
export const PaginationButton = ({i, activePage, setActivePage}: PaginationButtonProps): JSX.Element => {
    return <li key={i} className={i === activePage ? 'active' : ''}>
        <button
            type='button'
            onClick={() => setActivePage(i)}
            className='search-results-pagination pagination-button'
            aria-label={'pagineringsknapp ' + i}>
            {i}
        </button>
    </li>
};