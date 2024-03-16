'use client'

import { InputText } from 'primereact/inputtext';
import cx from './search.module.css'
import { useDispatch } from 'react-redux';
import { setSearch as setProductsSearch } from '@/app/dashboard/products/slice';
import { setSearch as setVouchersSearch } from '@/app/dashboard/vouchers/slice';
import { setSearch as setUsersSearch } from '@/app/dashboard/users/slice';
import { setSearch as setCategoriesSearch } from '@/app/dashboard/categories/slice';
import { setSearch as setItemCorrSearch } from '@/app/dashboard/categories/detail/[id]/slice';
import { usePathname } from 'next/navigation';

const Search: React.FC<Interfaces.SearchProps> = ({placeholder}) => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    let searchAction: any;

    if (pathname.startsWith('/dashboard/products')) {
        searchAction = setProductsSearch;
    } else if (pathname.startsWith('/dashboard/vouchers')) {
        searchAction = setVouchersSearch;
    } else if (pathname.startsWith('/dashboard/users')) {
        searchAction = setUsersSearch;
    } else if (pathname.startsWith('/dashboard/categories/detail')) {
        searchAction = setItemCorrSearch;
    } else if (pathname.startsWith('/dashboard/categories')) {
        searchAction = setCategoriesSearch;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (searchAction) {
            dispatch(searchAction(event.target.value));
        }
    };


    return ( 
        <div className={cx.wrapper}>
            <span style={{marginLeft: '8px'}} className='pi pi-search'></span>
            <InputText placeholder={placeholder} className={cx.input} onChange={handleInputChange} />
        </div>
    );
}
 
export default Search;