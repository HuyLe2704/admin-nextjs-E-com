/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { CATEGORIES_API_URL,  ADD_SUGGEST_ITEMS} from '../url';

class CategoriesService {
    getListCategories() {
        return axios.get(CATEGORIES_API_URL);
    }
    addCategories(category: DataInterfaces.CategoriesItem[]) {
        return axios.post<DataInterfaces.CategoriesItem>(CATEGORIES_API_URL, category);
    }
    deleteCategories(categoryId: string) {
        return axios.delete(`${CATEGORIES_API_URL}/${categoryId}`);
    }
    getCategoriesById(categoryId: string) {
        return axios.get(`${CATEGORIES_API_URL}/${categoryId}`);
    }
    updateCategories(categoryId: string, CategoriesDetails: DataInterfaces.CategoriesItem) {
        return axios.put(`${CATEGORIES_API_URL}/${categoryId}`, CategoriesDetails);
    }
}

export default new CategoriesService();
