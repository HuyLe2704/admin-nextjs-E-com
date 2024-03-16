import Image from 'next/image';
import MenuLink from './MenuLink/page';
import cx from './sidebar.module.css'

const menuItems: Interfaces.MenuItem[] = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: "pi pi-box"
            },
            {
                title: "Products",
                path: "/dashboard/products",
                icon: "pi pi-shopping-cart"
            },
            {
                title: "Categories",
                path: "/dashboard/categories",
                icon: "pi pi-th-large"
            },
            {
                title: "Vouchers",
                path: "/dashboard/vouchers",
                icon: "pi pi-ticket"
            },
        ],
    },
    {
        title: "Users",
        list: [
            {
                title: "Users",
                path: "/dashboard/users",
                icon: "pi pi-users"
            }
        ]
    }
]


const Sidebar = () => {
    return ( 
        <div className={cx.wrapper}>
            <div className={cx.user}>
                <Image className={cx.userImage} src="/YukiSS2-1.png" alt="" width="50" height="50" />
                <div className={cx.userDetail}>
                    <span className={cx.username}>Huy Lê</span>
                    <span className={cx.usertitle}>Adminstrator</span>
                </div>
            </div>
            <ul className={cx.list}>
                {menuItems.map(cat => (
                    <li key={cat.title}>
                        <span className={cx.cat}>{cat.title}</span>
                        {cat.list.map(item => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <button className={cx.logout}>
                <span className='pi pi-sign-out'></span>
                Logout
            </button>
        </div>
    );
}
 
export default Sidebar;