"use client"

import { InputText } from "primereact/inputtext";
import cx from './addorupdatepage.module.css'
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Image } from "primereact/image";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import SuggestItemsService from "../../service/ItemService/suggestItem"
import { uploadPreset } from "@/app/service/url";

interface AddOrUpdateInputField {
    field: keyof DataInterfaces.SuggestItems;
    header: string;
    type: 'text' | 'radio' | 'file';
}

interface IAddOrUpdatePage {
    addData: any,
    handleBackPage: string;
    getById?: any;
    dataForEdit?: any;
    addAsync?: any;
    updateAsync?: any;
}

const AddOrUpdatePage = (props: IAddOrUpdatePage) => {

    const { register, handleSubmit, control, formState: { errors }, setValue, reset } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const params = useParams<Params>()
    const pathname = usePathname()
    const yesId = useId();
    const noId = useId();
    const isAddMode = pathname.split('/').pop()
    const toast = useRef<Toast>(null)
    const abc = useSelector((state: RootState) => state.products.currentItem)

    const onSubmit = async (data: any) => {
        try {
            if (isAddMode === 'add') {
                await dispatch(props.addAsync([data]))
                toast.current?.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Sản phẩm đã được thêm mới.',
                    life: 3000
                });
            } else {
                await dispatch(props.updateAsync({
                    itemId: params.id,
                    productData: data
                }));
                toast.current?.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Sản phẩm đã được cập nhật.',
                    life: 3000
                });
            }
        }
        catch (error: any) {
            toast.current?.show({ severity: 'error', summary: 'Lỗi', detail: error.message || 'Có lỗi xảy ra từ server.', life: 3000 });
        }
    };

    useEffect(() => {
        if (isAddMode !== 'add') {
            dispatch(props.getById(params.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id, isAddMode])

    useEffect(() => {
        if (isAddMode !== 'add' && props.dataForEdit) {
            Object.keys(props.dataForEdit).forEach(key => {
                setValue(key, props.dataForEdit[key]);
            });
        }
    }, [props.dataForEdit, isAddMode, setValue]);

    const chooseOptions = {
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined',

    };
    const uploadOptions = {
        icon: 'pi pi-fw pi-cloud-upload',
        iconOnly: false,
        className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
    };
    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
    };

    const emptyTemplate = (
        <div className={cx.emptyTemplate}>
            <i className="pi pi-image mt-1 p-4" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5 text-sm">
                Drag and Drop Image Here
            </span>
        </div>
    )

    const handleSelectFile = async (e: any, field: string) => {
        const file = e.files[0];
        const formData = new FormData();
        formData.append('file', file);
        if (!uploadPreset) {
            console.error('Upload preset is undefined');
            return;
        }
        formData.append('upload_preset', uploadPreset);
    
        try {
            const response = await SuggestItemsService.uploadFileSuggestItem(formData)
            const imageUrl = response.data.secure_url;
            setValue(field, imageUrl);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBackPage = () => {
        router.push(props.handleBackPage)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Toast ref={toast} />
            <div className={cx.wrapper}>
                {props.addData.map((addData: AddOrUpdateInputField, index: number) => {
                    const isNumberField = ['price', 'discount', 'point', 'rating', 'quantity', 'sold'].includes(addData.field)
                    const isHiddenField = ['point', 'rating', 'sold', 'quantity'].includes(addData.field)
                    const isFileField = addData.type === 'file';
                    const valueField = props.dataForEdit ? props.dataForEdit[addData.field] : null;
                    const fileUploadTemplate = valueField ? (
                        <Image src={valueField} alt="Existing Image" width="200" style={{ marginLeft: '56px' }} />
                    ) : emptyTemplate;
                    
                    return (
                        <div key={index} style={{ display: isHiddenField ? 'none' : 'grid', paddingBottom: '4px', minWidth: '364px' }}>
                            <div className={cx.headerProduct}>{addData.header}</div>
                            {addData.type === 'radio' ? (
                                <Controller
                                    name={addData.field}
                                    control={control}
                                    render={({ field }) => (
                                        <div style={{ marginBottom: '12px' }} >
                                            <RadioButton
                                                inputId={yesId}
                                                name={field.name}
                                                value={1}
                                                onChange={(e) => field.onChange(e.value)}
                                                checked={field.value === 1}
                                                style={{ marginLeft: '12px' }}
                                            />
                                            <label htmlFor={yesId} style={{ marginRight: '12px' }}>Có</label>

                                            <RadioButton
                                                inputId={noId}
                                                name={field.name}
                                                value={0}
                                                onChange={(e) => field.onChange(e.value)}
                                                checked={field.value === 0}
                                                style={{ marginLeft: '10px' }}
                                            />
                                            <label htmlFor={noId}>Không</label>
                                        </div>
                                    )}
                                />
                            )
                                : isFileField ? (
                                    <div style={{ display: 'grid', paddingBottom: '4px' }} className={cx.fileUpLoad} >
                                        <Controller
                                            name={addData.field}
                                            control={control}
                                            render={({ field }) => (
                                                <FileUpload
                                                    {...field}
                                                    accept="image/*"
                                                    maxFileSize={10000000}
                                                    chooseOptions={chooseOptions}
                                                    uploadOptions={uploadOptions}
                                                    cancelOptions={cancelOptions}
                                                    emptyTemplate={fileUploadTemplate}
                                                    onSelect={(e) => handleSelectFile(e, addData.field)}
                                                />
                                            )}
                                        />
                                    </div>
                                )
                                    : (
                                        <div style={{ display: 'grid', paddingBottom: '4px' }}>
                                            <InputText
                                                {...register(addData.field, {
                                                    valueAsNumber: isNumberField,
                                                    validate: isNumberField ? (value) => {
                                                        return typeof value === 'number' && isFinite(value);
                                                    } : undefined
                                                })}
                                                defaultValue={addData.field === 'rating' || addData.field === 'point' || addData.field === 'sold' ? 0 : addData.field === 'quantity' ? 1 : ''}
                                                className={cx.input}
                                                hidden={isHiddenField}
                                            />

                                        </div>
                                    )}
                        </div>
                    )
                })}
            </div>
            <div className={cx.doubleButton}>
                <Button type="button" label="Thoát" className={cx.buttonCancel} onClick={handleBackPage} />
                <Button type="submit" label="Lưu" className={cx.buttonSubmit} />
            </div>
        </form>

    );
}

export default AddOrUpdatePage;