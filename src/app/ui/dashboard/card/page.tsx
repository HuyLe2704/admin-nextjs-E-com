import cx from './card.module.css'
import { v4 as uuidv4 } from 'uuid';

const Card = () => {
    const cardInfo: Interfaces.DataCardInfo[] = [
        {
            id: uuidv4(),
            title: 'Số lượng tài khoản',
            number: 5098742,
            desc: 'Số lượng tài khoản mới so với tháng trước',
            icon: 'pi pi-users',
            rate: 3
        },
        {
            id: uuidv4(),
            title: 'Số lượng giao dịch',
            number: 1844907621,
            desc: 'Số lượng giao dịch so với tháng trước',
            icon: 'pi pi-money-bill',
            rate: 2
        },
        {
            id: uuidv4(),
            title: 'Lượng truy cập',
            number: 3214207,
            desc: 'Số lượng người truy cập so với tháng trước',
            icon: 'pi pi-chart-line',
            rate: 1
        },
        {
            id: uuidv4(),
            title: 'Đơn giao thành công',
            number: 1746690841,
            desc: 'Số lượng đơn giao thành công so với tháng trước',
            icon: 'pi pi-chart-line',
            rate: 1
        },
    ]

    return (
        <>
            {
                cardInfo.map(item => (
                    <div key={item.id} className={cx.wrapper}>
                        <div >
                            <span className={item.icon}></span>
                            <div className={cx.texts}>
                                <span className={cx.title}>{item.title}</span>
                                <span className={cx.number}>{(item.number).toLocaleString('VI-vn')}</span>
                                <span className={cx.detail}>
                                    <span className={cx.positive}>{`${item.rate}%`}</span> {item.desc}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default Card;