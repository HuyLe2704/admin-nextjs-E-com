"use client"

import AddOrUpdatePage from "@/app/component/AddOrUpdatePage/page";
import { addProductInput } from "../constants";
import { addProductAsync } from "../slice";

const AddProduct = () => {
    return ( 
        <AddOrUpdatePage 
            addData={addProductInput} 
            addAsync={addProductAsync}
            handleBackPage="/dashboard/products" 
        />
    );
}
 
export default AddProduct;