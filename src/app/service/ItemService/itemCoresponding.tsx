/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { ITEMCORS_API_URL } from '../url';

class ItemCorsService {
    getListItemCor() {
        return axios.get(ITEMCORS_API_URL);
    }
    addItemCor(itemCor: DataInterfaces.ItemCorresponding[]) {
        return axios.post<DataInterfaces.ItemCorresponding>(ITEMCORS_API_URL, itemCor);
    }
    deleteItemCor(itemCor: string) {
        return axios.delete(`${ITEMCORS_API_URL}/${itemCor}`);
    }
    getItemCorById(itemCor: string) {
        return axios.get(`${ITEMCORS_API_URL}/${itemCor}`);
    }
    updateItemCor(itemCor: string, itemCorDetails: DataInterfaces.ItemCorresponding) {
        return axios.put(`${ITEMCORS_API_URL}/${itemCor}`, itemCorDetails);
    }
}

export default new ItemCorsService();
