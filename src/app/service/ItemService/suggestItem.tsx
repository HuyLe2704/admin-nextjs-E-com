/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { SUGGEST_ITEMS_REST_API_URL,  ADD_SUGGEST_ITEMS, CLOUDINARY_URL} from '../url';
const formData = new FormData();

class SuggestItemsService {
    getListSuggestItems() {
        return axios.get(SUGGEST_ITEMS_REST_API_URL);
    }
    addListSuggestItems(item: DataInterfaces.SuggestItems[]) {
        return axios.post<DataInterfaces.SuggestItems>(ADD_SUGGEST_ITEMS, item);
    }
    deleteSuggestItem(itemId: string) {
        return axios.delete(`${SUGGEST_ITEMS_REST_API_URL}/${itemId}`);
    }
    getSuggestItemById(itemId: string) {
        return axios.get(`${SUGGEST_ITEMS_REST_API_URL}/${itemId}`);
    }
    updateSuggestItem(itemId: string, suggestItemDetails: DataInterfaces.SuggestItems) {
        return axios.put(`${SUGGEST_ITEMS_REST_API_URL}/${itemId}`, suggestItemDetails);
    }
    uploadFileSuggestItem(formData: FormData) {
        return axios.post(CLOUDINARY_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
}

export default new SuggestItemsService();