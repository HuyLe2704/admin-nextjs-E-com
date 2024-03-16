"use client"

import AddOrUpdatePage from "@/app/component/AddOrUpdatePage/page";
import { addProductInput } from "@/app/dashboard/products/constants";
import { addItemCorrAsync } from "../slice";
import { useParams } from "next/navigation";

const AddItemCorresponding = () => {
    const params = useParams()
    return ( 
        <AddOrUpdatePage 
            addData={addProductInput} 
            addAsync={addItemCorrAsync}
            handleBackPage={`/dashboard/categories/detail/${params.id}`}
        />
    );
}
 
export default AddItemCorresponding;