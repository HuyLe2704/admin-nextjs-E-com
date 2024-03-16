/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { USER_REGISTER_API_URL} from '../url';

class UsersRegister {
    getUsersRegister() {
        return axios.get(USER_REGISTER_API_URL);
    }
    deleteSUsersRegister(userId: string) {
        return axios.delete(`${USER_REGISTER_API_URL}/${userId}`);
    }
}

export default new UsersRegister();