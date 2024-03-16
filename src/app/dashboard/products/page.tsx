'use client'

import DataTableComponent from '@/app/component/DataTable/DataTable';
import cx from '@/app/ui/dashboard/products/products.module.css'
import { useEffect } from 'react';
import SuggestItemsService from '../../service/ItemService/suggestItem'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAsync, setProducts } from './slice';
import { AppDispatch, RootState } from '@/app/lib/store';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

const ProductPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const productsItem = useSelector((state: RootState) => state.products.items)
    const search = useSelector((state: RootState) => state.products.search);
    const router = useRouter();

    const dataProductHeader = [
        { header: 'Ảnh sản phẩm', field: 'img' },
        { header: 'Tên sản phẩm', field: 'name' },
        { header: 'Giá tiền', field: 'price' },
        { header: 'Số lượng đánh giá', field: 'rating' },
        { header: 'Điểm số', field: 'point' },
        { header: 'Đã bán', field: 'sold' },
    ]

    const handleDeleteProduct = (itemId: string) => {
        dispatch(deleteProductAsync(itemId));
    };

    useEffect(() => {
        SuggestItemsService.getListSuggestItems()
            .then((res) => {
                dispatch(setProducts(res.data))
            })
            .catch((err: string) => {
                console.log(err)
            });
    }, [dispatch]);

    const filteredProducts = productsItem.filter(product =>
        product.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        router.push(`/dashboard/products/add`)
    }

    const handleEdit = (data: DataInterfaces.SuggestItems) => {
        router.push(`/dashboard/products/edit/${data.id}`)
    }

    const handleDetail = (data: DataInterfaces.SuggestItems) => {
        router.push(`/dashboard/products/detail/${data.id}`)
    }

    return (
        <div className={cx.wrapper}>
            <h2 style={{ marginBottom: '10px' }}>Phần Sản Phẩm</h2>
                <Button className={cx.addButton} onClick={() => handleAdd()} >
                    Thêm mới
                </Button>
            <div style={{ marginTop: '20px' }}>
                <DataTableComponent
                    data={filteredProducts}
                    headerClassName={cx.table}
                    dataHeader={dataProductHeader}
                    columnClassName={cx.column}
                    handleDelete={handleDeleteProduct}
                    handleEdit={handleEdit}
                    handleDetail={handleDetail}
                    edit
                />
            </div>
        </div>
    );
}

export default ProductPage;