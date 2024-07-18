import { api_URL } from './const';
import axios from 'axios';

export const addInventoryItem = (api_URL) => {
    return axios
        .post(`${api_URL}/inventories`)
        .then((response) => response.data)
        .catch((error) => console.log(error));
}