"use client"

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import cx from './datatable.module.scss'
import { useState } from "react";
import DialogComponent from "../Dialog/page";

const DataTableComponent: React.FC<Interfaces.DataTableProps> = (props) => {
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);

    const imageBodyTemplate = (rowData: any) => {
        const imageSrc = rowData.img || "/noavatar.png";
        return (
            <div className={cx.imageWrapper} >
                <Image src={imageSrc} alt="Avatar" preview width="50" height="50" />
            </div>
        )
    }

    const serialNumberTemplate = (rowData: any, props: any) => {
        const index = props.rowIndex + 1;
        return <span>{index}</span>;
    };

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const toggleDialog = () => {
        setVisibleDialog(!visibleDialog);
    }

    const textBodyTemplate = (rowData: any, column: any) => {
        let cellValue
        if (column.field === 'status') {
            const statusText = rowData[column.field] === 0 ? 'Không hoạt động' : 'Đang hoạt động';
            const statusClass = rowData[column.field] === 0 ? cx.statusInactive : cx.statusActive;
            return <span className={`${cx.cellContent} ${statusClass}`}>{statusText}</span>;
        }
        else if (column.field === 'sold') {
            const soldNumber = parseInt(rowData[column.field], 10);
            cellValue = soldNumber.toLocaleString('vi-VN')
        } else if (column.field === 'price' || column.field === 'rating' || column.field === 'newPrice') {
            cellValue = Number(rowData[column.field]).toLocaleString('vi-VN');
        } else {
            cellValue = rowData[column.field];
        }
        return <span className={cx.cellContent}>{cellValue}</span>;
    };

    const action = (rowData: DataInterfaces.SuggestItems) => {
        return (
            <>
                <span
                    className="pi pi-eye"
                    style={{ color: 'blue', cursor: 'pointer', marginRight: '18px' }}
                    onClick={() => props.handleDetail(rowData)}
                >
                </span>
                {props.edit && (
                    <span
                        className="pi pi-pencil"
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={() => props.handleEdit(rowData)}
                    >
                    </span>
                )}
                <span
                    className="pi pi-trash"
                    style={{ color: 'red', cursor: 'pointer', marginLeft: props.edit ? '18px' : undefined, marginRight: props.edit ? '12px' : undefined }}
                    onClick={() => handleDeleteData(rowData.id)}
                >
                </span>
            </>
        )
    }

    const handleDeleteData = (id: any) => {
        setItemIdToDelete(id);
        toggleDialog();
    }

    const confirmDelete = () => {
        if (itemIdToDelete !== null) {
            props.handleDelete(itemIdToDelete);
            setItemIdToDelete(null);
        }
    };

    const dialogDesc = (
        <>
            {("Bạn đã chắc chắn muốn thực hiện xóa dữ liệu này ?").toLocaleUpperCase()}
            <br />
            <br />
            {("Dữ liệu của bạn sẽ bị thay đổi sau khi bấm xác nhận!").toLocaleUpperCase()}
        </>
    )

    return (
        <>
            <DataTable
                emptyMessage="Không có dữ liệu nào"
                value={props.data}
                className={props.headerClassName}
                paginator
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Đang hiển thị {first} đến {last} trong số {totalRecords} bản ghi"
                first={first}
                rows={rows}
                totalRecords={props.data.length}
                rowsPerPageOptions={[10, 20, 30]}
                onPage={onPageChange}
                scrollable
                tableStyle={{ fontSize: '14px' }}
            >
                <Column
                    header="STT"
                    body={serialNumberTemplate}
                    style={{ textAlign: 'center' }}
                />
                {props.dataHeader.map((col, i) => {
                    const isImageColumn = col.field === 'img';
                    const isPasswordColumn = col.field === 'userPassword'
                    const isCreatedDateColumn = col.field === 'created_at'
                    return (
                        <Column
                            key={i}
                            field={col.field}
                            header={col.header}
                            className={props.columnClassName}
                            body={isImageColumn ? imageBodyTemplate : isPasswordColumn
                                ? props.passwordColumnBodyTemplate : isCreatedDateColumn
                                    ? props.createdDateTemplate : (rowData) => textBodyTemplate(rowData, col)

                            }
                        />
                    );
                })}
                <Column
                    header="Chọn"
                    body={action}
                    style={{ width: props.edit ? undefined : '100px' }}
                />
            </DataTable>
            <div>
                {visibleDialog && <DialogComponent onConfirm={confirmDelete} setVisible={setVisibleDialog} visible={visibleDialog} desc={dialogDesc} />}
            </div>
        </>
    );
}

export default DataTableComponent;