import Navbar from "../ui/dashboard/navbar/page";
import Sidebar from "../ui/dashboard/sidebar/page";
import cx from "../ui/dashboard/dashboard.module.css"
import Footer from "../ui/dashboard/footer/page";

const Layout = ({children}: any) => {
    return ( 
        <div className={cx.container}>
            <div className={cx.menu}>
                <Sidebar />
            </div>
            <div className={cx.content}>
                <Navbar />
                {children}
                <Footer />
            </div>
        </div>
    );
}
 
export default Layout;