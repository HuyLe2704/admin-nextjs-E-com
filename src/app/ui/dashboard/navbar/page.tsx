"use client"

import { usePathname } from 'next/navigation';
import cx from './navbar.module.css'
import Search from '../search/page';

const Navbar = () => {
    const pathname = usePathname();

    return ( 
        <div className={cx.wrapper}>
            <div className={cx.title}>{pathname}</div>
            <div className={cx.menu}>
                <div className={cx.search}>
                    <Search placeholder='Tìm theo tên...' className={cx.input} />
                </div>
                <div className={cx.icons}>
                    <span className='pi pi-bell'></span>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;