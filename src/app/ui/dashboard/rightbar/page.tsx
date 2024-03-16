import Image from 'next/image';
import cx from './rightbar.module.css'
import { Button } from 'primereact/button';

const Rightbar = () => {
    return (
        <div className={cx.wrapper}>
            <div className={cx.item}>
                <div className={cx.bgContainer}>
                    <Image src="/astronaut.png" alt="" fill sizes='' className={cx.bg} />
                </div>
                <div className={cx.texts}>
                    <span className={cx.notification}>Bảng Điều Khiển Quản Trị Shopee</span>
                    <h2 className={cx.title}>Quản Lý Toàn Diện, Đơn Giản Hóa Kinh Doanh</h2>
                    <p className={cx.desc}>
                        Chào mừng đến với trung tâm điều hành - nơi quản lý kinh doanh trực tuyến trở nên thông minh và hiệu quả hơn bao giờ hết.
                    </p>
                    {/* <Button className={cx.button}>
                        <span className='pi pi-eye'></span>
                        Watch
                    </Button> */}
                </div>
            </div>
        </div>
    );
}

export default Rightbar;