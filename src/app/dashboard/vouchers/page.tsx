'use client'

import DataTableComponent from '@/app/component/DataTable/DataTable';
import cx from '@/app/ui/dashboard/products/products.module.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVoucherAsync } from './slice';
import { AppDispatch, RootState } from '@/app/lib/store';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import voucher from '@/app/service/ItemService/voucher';
import { setVouchers } from './slice';

const VoucherPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const vouchers = useSelector((state: RootState) => state.vouchers.vouchers)
    const search = useSelector((state: RootState) => state.vouchers.search);
    const router = useRouter();

    const dataVoucherHeader = [
        { header: 'Ảnh Voucher', field: 'img' },
        { header: 'Loại Voucher', field: 'name' },
        { header: 'Giảm giá tối đa', field: 'maxDiscount' },
        { header: 'Điều kiện kích hoạt', field: 'minPrice' },
        { header: 'Mô tả', field: 'description' },
        { header: 'Thời gian', field: 'timeDiscount' },
    ]

    const handleDeleteVoucher = (itemId: string) => {
        dispatch(deleteVoucherAsync(itemId));
    };

    useEffect(() => {
        voucher.getVouchers()
            .then((res) => {
                dispatch(setVouchers(res.data))
            })
            .catch((err: string) => {
                console.log(err)
            });
    }, [dispatch]);

    const filteredVouchers = vouchers.filter(voucher =>
        voucher.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        router.push(`/dashboard/vouchers/add`)
    }

    const handleEdit = (data: DataInterfaces.Vouchers) => {
        router.push(`/dashboard/vouchers/edit/${data.id}`)
    }

    const handleDetail = (data: DataInterfaces.SuggestItems) => {
        router.push(`/dashboard/vouchers/detail/${data.id}`)
    }

    return (
        <div className={cx.wrapper}>
            <h2 style={{ marginBottom: '10px' }}>Phần Sản Phẩm</h2>
                <Button className={cx.addButton} onClick={() => handleAdd()} >
                    Thêm mới
                </Button>
            <div style={{ marginTop: '20px' }}>
                <DataTableComponent
                    data={filteredVouchers}
                    headerClassName={cx.table}
                    dataHeader={dataVoucherHeader}
                    columnClassName={cx.column}
                    handleDelete={handleDeleteVoucher}
                    handleEdit={handleEdit}
                    handleDetail={handleDetail}
                    edit
                />
            </div>
        </div>
    );
}

export default VoucherPage;