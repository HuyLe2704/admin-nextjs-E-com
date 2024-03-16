'use client'
import DataTableComponent from '@/app/component/DataTable/DataTable';
import cx from '@/app/ui/dashboard/categories/categories.module.css'
import { useEffect } from 'react';
import CategoriesService from '../../service/ItemService/categories'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/store';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { deleteCategoryAsync, setCategories } from './slice';

const ProductPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const categoryItem = useSelector((state: RootState) => state.categories.items)
    const search = useSelector((state: RootState) => state.categories.search);
    const router = useRouter();

    const dataUserHeader = [
        { header: 'Ảnh danh mục', field: 'img' },
        { header: 'Tên danh mục', field: 'name' },
    ]

    const handleDeleteCategory = (categoryId: string) => {
        dispatch(deleteCategoryAsync(categoryId));
    };

    useEffect(() => {
        CategoriesService.getListCategories()
            .then((res) => {
                dispatch(setCategories(res.data))
            })
            .catch((err: string) => {
                console.log(err)
            });
    }, [dispatch]);

    const filteredCategories = categoryItem.filter(category =>
        category.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        router.push(`/dashboard/categories/add`)
    }

    const handleEdit = (data: DataInterfaces.CategoriesItem) => {
        router.push(`/dashboard/categories/edit/${data.categoryId}`)
    }

    const handleDetail = (data: DataInterfaces.CategoriesItem) => {
        router.push(`/dashboard/categories/detail/${data.categoryId}`)
    }

    return (
        <div className={cx.wrapper}>
            <h2 style={{ marginBottom: '10px' }}>Phần Danh Mục</h2>
                <Button className={cx.addButton} onClick={() => handleAdd()} >
                    Thêm mới
                </Button>
            <div style={{ marginTop: '20px' }}>
                <DataTableComponent
                    data={filteredCategories}
                    headerClassName={cx.table}
                    dataHeader={dataUserHeader}
                    columnClassName={cx.column}
                    handleDelete={handleDeleteCategory}
                    handleEdit={handleEdit}
                    handleDetail={handleDetail}
                    edit
                />
            </div>
        </div>
    );
}

export default ProductPage;