'use client'
import DataTableComponent from '@/app/component/DataTable/DataTable';
import { AppDispatch, RootState } from '@/app/lib/store';
import cx from '@/app/ui/dashboard/orders/orders.module.css'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderService from '../../service/ItemService/orders'
import { setOrders } from './slice';
import moment from 'moment';

const OrderPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.orders.items)
    const search = useSelector((state: RootState) => state.orders.search);
    const router = useRouter();

    const formattedOrders = orders.map(order => ({
        ...order,
        orderAt: `Ngày: ${moment(order.orderAt).format("DD/MM/YY")}, Thời Gian: ${moment(order.orderAt).format("HH:mm:ss")}`
    }))

    const dataOrdersHeader = [
        { header: 'Mã đơn hàng', field: 'id' },
        { header: 'Mã Người đặt hàng', field: 'customerId' },
        { header: 'Thời gian đặt hàng', field: 'orderAt' },
    ]

    const filteredProducts = formattedOrders.filter(order =>
        order.orderAt?.toLowerCase().includes(search.toLowerCase())
    );

    const handleDetail = (data: DataInterfaces.SuggestItems) => {
        router.push(`/dashboard/orders/detail/${data.id}`)
    }

    useEffect(() => {
        OrderService.getListOrders()
            .then((res) => {
                console.log(res.data)
                dispatch(setOrders(res.data))
            })
            .catch((err: string) => {
                console.log(err)
            });
    }, [dispatch]);

    return ( 
        <div className={cx.wrapper}>
            <h2 style={{ marginBottom: '10px', marginTop: '20px' }}>Các Giao Dịch</h2>
            <div style={{ marginTop: '20px' }}>
                <DataTableComponent
                    data={filteredProducts}
                    headerClassName={cx.table}
                    dataHeader={dataOrdersHeader}
                    columnClassName={cx.column}
                    handleDelete={false}
                    handleEdit={false}
                    handleDetail={handleDetail}
                    edit={false}
                />
            </div>
        </div>
    );
}
 
export default OrderPage;