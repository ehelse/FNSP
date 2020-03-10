import * as React from 'react';
import Catalog from './Catalog';
import {PaginationButton} from './paginationButton';

export type PaginatorProps = {
    list: any[];
    resultsPerPage: number;
}

const Paginator = ({list, resultsPerPage}: PaginatorProps): any => {
    const [activePage, setActivePage] = React.useState(1);
    const [isMobile, setIsMobile] = React.useState(false);
    const [mobileMenu, setOpenMobileMenu] = React.useState(false);

    const numberOfPages = Math.ceil(list.length / resultsPerPage);
    const indexOfLastTodo = activePage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);

    React.useEffect(() => {
        //window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [activePage]);

    React.useEffect(() => {
        setActivePage(1)
    }, [list]);

    React.useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            setIsMobile(true);
        }
    }, []);

    const pageList = [] as any;
    for (let i = 1; i <= numberOfPages; i++) {
        pageList.push(i);
    }
    const paginingClick = (page: any) => {
        setActivePage(page);
        setOpenMobileMenu(false);
    }
    const getResultHitsMarkup = list.length === 0 ? <p>Fant ingen resultater</p> : list.length === 1 ? <p>Viser 1 resultat</p> : <p>Viser {list.length} resultater</p>

    return <div className='col-md-8'>
        {getResultHitsMarkup}
        <Catalog events={currentTodos}/>
        {/* <ul className='m_pagination_clean' id='pager'>
            <li>
                <button type='button' onClick={() => setActivePage(activePage === 1 ? pageList.length : activePage - 1)}
                        className='search-results-pagination pagination-button left' aria-label='paginering pil venstre'/>
            </li>

            {!isMobile ? pageList.map((i: number) => {
                const isTooHighOrLow = i > activePage + 2 && i !== pageList.length || i < activePage - 2 && i !== 1;
                const isEllipsis = i === activePage + 2 && i !== pageList.length || i === activePage - 2 && i !== 1;

                if (isTooHighOrLow) {
                    return null
                } else if (isEllipsis) {
                    return <span key={'ellipsis' + i} className='ellipsis'>...</span>
                } else {
                    return <PaginationButton i={i} activePage={activePage} setActivePage={setActivePage} key={i}/>
                }
            }) : <div className='mobilemenu'>
                <span onClick={() => setOpenMobileMenu(!mobileMenu)}
                      className={`mobilepagination ${mobileMenu ? 'mobileopen' : ''}`}>Side {activePage} av {pageList.length}</span>
                {mobileMenu ? <div className='mobiledropdown'>{pageList.map((page: number) => {
                    return <button key={page} onClick={() => paginingClick(page)} type='button' className={`pagebutton${page === activePage ? ' active' : ''}`} aria-label={'pagineringsknaoo ' + page}>{page}</button>
                })}</div> : null}
            </div>}

            <li>
                <button
                    type='button'
                    aria-label='paginering pil høyre'
                    onClick={() => setActivePage(activePage === pageList.length ? 1 : activePage + 1)}
                    className='search-results-pagination pagination-button right'/>
            </li>
        </ul> */}
    </div>
};
export default Paginator;