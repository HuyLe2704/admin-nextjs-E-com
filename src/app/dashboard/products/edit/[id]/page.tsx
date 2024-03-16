'use client'

import AddOrUpdatePage from "@/app/component/AddOrUpdatePage/page";
import { addProductInput } from "../../constants";
import { getProductByIdAsync, updateProductAsync } from "../../slice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

const EditProduct = () => {
    const dataForEdit: any = useSelector((state: RootState) => state.products.currentItem);
    return ( 
        <AddOrUpdatePage
            addData={addProductInput} 
            handleBackPage="/dashboard/products" 
            updateAsync={updateProductAsync}
            getById={getProductByIdAsync}
            dataForEdit={dataForEdit}
        />
    );
}
 
export default EditProduct;