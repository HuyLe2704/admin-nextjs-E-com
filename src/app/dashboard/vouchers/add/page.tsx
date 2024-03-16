"use client"

import AddOrUpdatePage from "@/app/component/AddOrUpdatePage/page";
import { addVoucherInput } from "../constants";
import { addVoucherAsync } from "../slice";

const AddVoucher = () => {
    return ( 
        <AddOrUpdatePage 
            addData={addVoucherInput} 
            handleBackPage="/dashboard/vouchers" 
            addAsync={addVoucherAsync}
        />
    );
}
 
export default AddVoucher;