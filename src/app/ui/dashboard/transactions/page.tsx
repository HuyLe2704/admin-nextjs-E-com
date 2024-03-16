import { Image } from 'primereact/image';
import cx from './transactions.module.css'

const Transactions = () => {

    return ( 
        <div className={cx.wrapper}>
            <h2 className={cx.title}>Danh sách các Admin</h2>
            <table className={cx.table}>
                <thead>
                    <tr>
                        <td>Tên</td>
                        <td>Trạng thái</td>
                        <td>Ngày đăng ký</td>
                        <td>Email</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={cx.user_wrapper}>
                            <div className={cx.user}></div>
                            <Image 
                                src="/YukiSS2-1.png" 
                                alt="" 
                                width='40' 
                                height='40' 
                                className={cx.userImage}
                            />
                            <span className={cx.name}>Huy Lê</span>
                        </td>
                        <td>
                            <span className={`${cx.status} ${cx.online}`}>Online</span>
                        </td>
                        <td>20.02.2021</td>
                        <td>lelamhuy@gmail.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
 
export default Transactions;