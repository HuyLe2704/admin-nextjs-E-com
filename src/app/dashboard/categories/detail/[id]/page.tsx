'use client'

import { Button } from "primereact/button";
import cx from '@/app/ui/dashboard/categories/categories.module.css'
import { useParams, useRouter } from "next/navigation";
import ItemCorsService from '../../../../service/ItemService/itemCoresponding'
import DataTableComponent from "@/app/component/DataTable/DataTable";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/app/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemCorrAsync, setItemCorr } from "./slice";

const CategoriesDetail = () => {
    const dispatch: AppDispatch = useDispatch();
    const itemCors = useSelector((state: RootState) => state.itemCorresponding.items)
    const search = useSelector((state: RootState) => state.itemCorresponding.search);
    const router = useRouter();
    const params = useParams()
    const dataItemCorsHeader = [
        { header: 'Ảnh sản phẩm', field: 'img' },
        { header: 'Tên sản phẩm', field: 'name' },
        { header: 'Giá tiền', field: 'price' },
        { header: 'Số lượng đánh giá', field: 'rating' },
        { header: 'Điểm số', field: 'point' },
        { header: 'Đã bán', field: 'sold' },
    ]
    const handleAdd = () => {
        router.push(`/dashboard/categories/detail/${params.id}/add`)
    }

    const handleDeleteItemCor = (itemId: string) => {
        dispatch(deleteItemCorrAsync(itemId));
    };

    useEffect(() => {
        ItemCorsService.getListItemCor()
            .then((res) => {
                dispatch(setItemCorr(res.data))
            })
            .catch((err: string) => {
                console.log(err)
            });
    }, [dispatch]);

    const filteredCategories = itemCors.filter(cor =>
        cor.corrId === Number(params.id) && cor.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (data: DataInterfaces.ItemCorresponding) => {
        router.push(`/dashboard/categories/detail/${params.id}/edit/${data.id}`);
      }

    const handleDetail = (data: DataInterfaces.ItemCorresponding) => {
        router.push(`/dashboard/categories/detail/${params.id}/detail`)
    }

    return ( 
        <div className={cx.wrapper}>
            <h2 style={{ marginBottom: '10px' }}>Phần Sản Phẩm</h2>
                <Button className={cx.addButton} onClick={() => handleAdd()} >
                    Thêm mới
                </Button>
            <div style={{ marginTop: '20px' }}>
                <DataTableComponent
                    data={filteredCategories}
                    headerClassName={cx.table}
                    dataHeader={dataItemCorsHeader}
                    columnClassName={cx.column}
                    handleDelete={handleDeleteItemCor}
                    handleEdit={handleEdit}
                    handleDetail={handleDetail}
                    edit
                />
            </div>
        </div>
    );
}
 
export default CategoriesDetail;