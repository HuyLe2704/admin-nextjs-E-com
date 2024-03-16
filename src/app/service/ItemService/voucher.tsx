/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { VOUCHERS_API_URL} from '../url';

class VoucherService {
    getVouchers() {
        return axios.get(VOUCHERS_API_URL);
    }
    addVoucher(item: DataInterfaces.Vouchers[]) {
        return axios.post<DataInterfaces.Vouchers>(VOUCHERS_API_URL, item);
    }
    deleteVoucher(itemId: string) {
        return axios.delete(`${VOUCHERS_API_URL}/${itemId}`);
    }
    getVoucherById(itemId: string) {
        return axios.get(`${VOUCHERS_API_URL}/${itemId}`);
    }
    updateVoucher(itemId: string, voucherDetails: DataInterfaces.Vouchers) {
        return axios.put(`${VOUCHERS_API_URL}/${itemId}`, voucherDetails);
    }
}

export default new VoucherService();