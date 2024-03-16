"use client"

import Link from 'next/link';
import cx from './menuLink.module.css'
import { usePathname } from 'next/navigation';

const MenuLink = ({item}: any) => {

    const pathname = usePathname();

    return ( 
        <Link 
            href={item.path} 
            className={`${cx.wrapper} ${pathname === item.path && cx.active}`}
        >
            <i className={item.icon} />
            <div className={`${pathname === item.path && cx.active}`}>{item.title}</div>
        </Link>
    );
}
 
export default MenuLink;