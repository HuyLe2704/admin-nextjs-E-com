import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import cx from './dialog.module.css'

interface IDialog {
    visible: boolean;
    setVisible: (value: boolean) => void;
    desc: any
}

const DialogComponent = (props: IDialog & { onConfirm: () => void }) => {

    const handleConfirm = () => {
        props.setVisible(false); 
        props.onConfirm(); 
    };

    const handleCancel = () => {
        props.setVisible(false); 
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Cảnh báo" headerStyle={{color: 'red'}} visible={props.visible} style={{ width: '50vw' }} onHide={() => props.setVisible(false)}>
                <p className="m-0" style={{color: 'red'}}>
                    {props.desc}
                </p>
                <div className={cx.doubleButton}>
                    <Button label="Hủy" onClick={handleCancel} style={{marginRight: '10px', width: '100px'}} />
                    <Button label="Xác nhận" onClick={handleConfirm} className="p-button-danger" />
                </div>
            </Dialog>
        </div>
    )
}

export default DialogComponent;