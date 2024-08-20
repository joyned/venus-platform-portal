import axios, { AxiosResponse } from "axios";

export default class HttpService {
    static async get<T>(uri: string): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>(async (resolve, reject) => {
            await axios.get(process.env.REACT_APP_API_URL + uri)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    static async post<T>(uri: string, data: any): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>(async (resolve, reject) => {
            await axios.post(process.env.REACT_APP_API_URL + uri, data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                });
        });
    }
}