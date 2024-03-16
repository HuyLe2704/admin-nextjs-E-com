/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { addVoucherInput } from "../../constants";
import { useSelector } from "react-redux";
import { getVoucherByIdAsync } from "../../slice";
import { RootState } from "@/app/lib/store";
import DetailComponent from "@/app/component/DetailComponent/page";

const DetailVoucher = () => {
    const voucherInfo = useSelector((state: RootState) => state.vouchers.currentVoucher)

    return (
        <DetailComponent 
            infoItem={voucherInfo} 
            addInput={addVoucherInput} 
            getById={getVoucherByIdAsync}  
            handleBackPage="/dashboard/vouchers"
        />
    )
}

export default DetailVoucher;