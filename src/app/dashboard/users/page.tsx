'use client'

import DataTableComponent from '@/app/component/DataTable/DataTable';
import { AppDispatch, RootState } from '@/app/lib/store';
import cx from '@/app/ui/dashboard/users/users.module.css'
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAsync, setUsers } from './slice';
import UsersRegister from '@/app/service/ItemService/userRegister';

const Users = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);
    const search = useSelector((state: RootState) => state.users.search);
    const [passwordsVisibility, setPasswordsVisibility] = useState<any>({});

    const dataUserHeader = [
        { header: 'Ảnh đại diện', field: 'img' },
        { header: 'Tên đăng nhập', field: 'userName' },
        { header: 'Mật khẩu', field: 'userPassword' },
        { header: 'Email', field: 'userEmail' },
        { header: 'Ngày tạo', field: 'created_at' },
    ]

    useEffect(() => {
        UsersRegister.getUsersRegister()
            .then((res) => {
                dispatch(setUsers(res.data))
            })
            .catch((err: string) => {
                console.error(err)
            })
    }, [dispatch])
    
    const handleDeleteUser = (userId: string) => {
        dispatch(deleteUserAsync(userId))
    }

    const filteredUsers = users.filter(user => 
        user.userName?.toLowerCase().includes(search.toLowerCase())
    );

    const togglePasswordVisibility = (id: any) => {
        setPasswordsVisibility((prevState: {[key: string | number]: boolean}) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const passwordColumnBodyTemplate = (rowData: any) => {
        const isVisible = passwordsVisibility[rowData.id];
        const passwordValue = isVisible ? rowData.userPassword : '••••••';
        return (
            <div style={{marginTop: "-18px"}}>
                <span className={cx.cellContent}>{passwordValue}</span>
                <Button
                    icon={isVisible ? "pi pi-eye-slash" : "pi pi-eye"}
                    onClick={() => togglePasswordVisibility(rowData.id)}
                    className={cx.buttonEye}
                    aria-label="Toggle Password Visibility"
                />
            </div>
        );
    };

    const createdDateTemplate = (rowData: any) => {
        if (rowData && rowData.createdAt) {
            const isoString = rowData.createdAt.split('.')[0];
            const date = new Date(isoString);
            const dateString = date.toLocaleDateString('vi-VN');
            return <span>{dateString}</span>;
        }
        return 'Không xác định';
    };

    return (
        <div className={cx.wrapper}>
            <h2 style={{ marginBottom: '10px' }}>Phần Quản lý Tài Khoản Người Dùng</h2>
            <div style={{marginTop: '20px'}}>
                <DataTableComponent 
                    data={filteredUsers} 
                    headerClassName={cx.table} 
                    dataHeader={dataUserHeader}
                    columnClassName={cx.column}
                    handleDelete={handleDeleteUser}
                    passwordColumnBodyTemplate={passwordColumnBodyTemplate}
                    createdDateTemplate={createdDateTemplate}
                    edit={false}
                />
            </div>
        </div>
    );
}

export default Users;