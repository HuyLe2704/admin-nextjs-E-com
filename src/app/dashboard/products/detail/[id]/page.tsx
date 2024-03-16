/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { addProductInput } from "../../constants";
import { useSelector } from "react-redux";
import { getProductByIdAsync } from "../../slice";
import { RootState } from "@/app/lib/store";
import DetailComponent from "@/app/component/DetailComponent/page";

const DetailProducts = () => {
    const productInfo = useSelector((state: RootState) => state.products.currentItem)

    return (
        <DetailComponent 
            infoItem={productInfo} 
            addInput={addProductInput} 
            getById={getProductByIdAsync}  
            handleBackPage="/dashboard/products"
        />
    )
}

export default DetailProducts;