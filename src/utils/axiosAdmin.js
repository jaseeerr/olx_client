import axios from "axios";
import { BASE_URL } from "../config/URLS";

const MyAxiosInstance = () => {


   let token = JSON.parse(localStorage.getItem('adminToken'))
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  return instance;
};

export default MyAxiosInstance;
