import { useStore } from "@/components/hooks/zustant/store";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const client = axios.create({
    baseURL: BASE_URL
})

export const request = async (options : AxiosRequestConfig<any>) => {
    let token
    const state = useStore.getState()
    const user = state?.user
    
    if (user === null) {
        token = ""
    }
    else {
        const { accessToken } = user
        token = accessToken
    }
    // Set the authorization header
    token !== "" && (client.defaults.headers.common.Authorization = `Bearer ${token}`);

    const onSuccess = (response : AxiosResponse) => {
        return response?.data;
    };

    const onError = (error : AxiosError) => {
        return Promise.reject(error.response?.data);
    };

    return client(options).then(onSuccess).catch(onError);
};
