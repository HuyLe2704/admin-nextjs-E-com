'use client'

import AddOrUpdatePage from "@/app/component/AddOrUpdatePage/page";
import { addVoucherInput } from "../../constants";
import { getVoucherByIdAsync, updateVoucherAsync } from "../../slice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

const EditVoucher = () => {
    const dataForEdit: any = useSelector((state: RootState) => state.vouchers.currentVoucher);

    return ( 
        <AddOrUpdatePage
            addData={addVoucherInput} 
            handleBackPage="/dashboard/vouchers" 
            getById={getVoucherByIdAsync}
            updateAsync={updateVoucherAsync}
            dataForEdit={dataForEdit}
        />
    );
}
 
export default EditVoucher;