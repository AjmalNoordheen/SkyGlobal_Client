import axios from "axios";
import { userUrl } from "../Constants/BaseUrl";
import { useSelector } from "react-redux";

export const createUserInstance = () => {
  const token = useSelector((state) => state.user.token);

  const userInstance = axios.create({
    baseURL: userUrl,
  });

  userInstance.interceptors.request.use(
    (config)=>{
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config
    },
    (error)=>{
        return Promise.reject(error);
    }
  )

  return userInstance
};

