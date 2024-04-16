/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { ORDERS_DETAIL_API_URL, ORDERS_API_URL, GET_CUSTOMER_BY_ID_API_URL} from '../url';

class OrderService {
    getListOrders() {
        return axios.get(ORDERS_API_URL);
    }
    getListOrdersDetail() {
        return axios.get(ORDERS_DETAIL_API_URL);
    }
    getOrderById(id: any) {
        return axios.get(`${ORDERS_API_URL}/${id}`);
    }
    getCustomerById(customerId: any) {
        return axios.get(`${GET_CUSTOMER_BY_ID_API_URL}/${customerId}`)
    }
}

export default new OrderService();
