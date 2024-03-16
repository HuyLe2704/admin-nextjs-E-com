import Card from "../ui/dashboard/card/page";
import Chart from "../ui/dashboard/chart/page";
import cx from '../ui/dashboard/dashboard.module.css'
import Rightbar from "../ui/dashboard/rightbar/page";
import Transactions from "../ui/dashboard/transactions/page";

const Dashboard = () => {
    return ( 
        <div className={cx.wrapper}>
            <div className={cx.main}>
                <div className={cx.cards}>
                    <Card/>
                </div>
                    <Transactions />
                    <Chart />
            </div>
            <div className={cx.side}>
                <Rightbar />
            </div>
        </div>
    );
}
 
export default Dashboard;