'use client'

import AddOrUpdatePage from "@/app/component/AddOrUpdatePage/page";
import { addProductInput } from "@/app/dashboard/products/constants";
import { addItemCorrAsync, updateItemCorrAsync } from "../../slice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { useParams } from "next/navigation";

const EditProduct = () => {
    const params = useParams()
    const dataForEdit: any = useSelector((state: RootState) => state.products.currentItem);
    return ( 
        <AddOrUpdatePage
            addData={addProductInput} 
            handleBackPage={`/dashboard/categories/detail/${params.id}`}
            updateAsync={updateItemCorrAsync}
            getById={addItemCorrAsync}
            dataForEdit={dataForEdit}
        />
    );
}
 
export default EditProduct;