/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { OrderDetail } from "../../constants";
import { useSelector } from "react-redux";
import { getOrderByIdAsync } from "../../slice";
import { RootState } from "../../../../lib/store";
import DetailComponent from "../../../../component/DetailComponent/page"
import OrderService from "../../../../service/ItemService/orders"
import { useEffect, useState } from "react";

const DetailProducts = () => {
    const orderInfo = useSelector((state: RootState) => state.orders.currentOrders)
    const [customer, setCustomer] = useState([])

    const getCustomerById = async () => {
        const customerId = orderInfo?.customerId
        try {
            const response = await OrderService.getCustomerById(customerId)
            setCustomer(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomerById()
    }, [orderInfo])

    console.log(customer)

    return (
        <DetailComponent 
            infoItem={orderInfo} 
            addInput={OrderDetail} 
            getById={getOrderByIdAsync}  
            handleBackPage="/dashboard/orders"
            customer={customer}
        />
    )
}

export default DetailProducts;