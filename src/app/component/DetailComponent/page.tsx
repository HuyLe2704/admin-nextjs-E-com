'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from "@/app/lib/store"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { useParams, useRouter } from "next/navigation"
import { Toast } from "primereact/toast"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import cx from './DetailComponent.module.css'
import { Dispatch } from "redux"
import { Image } from "primereact/image"
import { Button } from "primereact/button"

interface DetailComponentProps {
    infoItem: any;
    addInput: {
        field: string;
        header: string;
        type: string;
    }[];
    getById: any;
    handleBackPage: string;
    customer?: string[]
}

const DetailComponent = (props: DetailComponentProps) => {
    const toast = useRef<Toast>(null)
    const dispatch = useDispatch<Dispatch>()
    const params = useParams<Params>()
    const router = useRouter()

    useEffect(() => {
        dispatch(props.getById(params.id));
    }, [dispatch])

    return (
        <div>
            <Toast ref={toast} />
            <div className={cx.wrapper}>
                {props.addInput.map((input, index) => {
                    let value = props.infoItem ? props.infoItem[input.field] : '';
                    if (input.type === 'radio') {
                        value = value === 1 ? 'Có' : 'Không';
                    }
                    return (
                        <div key={index} style={{ display: input.type === 'file' ? 'grid' : 'flex', paddingBottom: '12px', flexWrap: 'wrap' }}>
                            <div className={cx.headerProduct}>{input.header}: </div>
                            <div className={cx.productValue}>
                                {input.type === 'file' ? (
                                    value ? <Image src={value} alt="product" style={{ maxWidth: '100px', maxHeight: '100px' }} /> : 'No Image'
                                ) : (
                                    <span>{value}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button label="Quay lại" onClick={() => router.push(props.handleBackPage)}  />
            </div>
        </div>
    );
}
 
export default DetailComponent;