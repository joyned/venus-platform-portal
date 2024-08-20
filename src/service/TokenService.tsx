import { AxiosResponse } from "axios";
import HttpService from "./HttpService";

export default class TokenService {
    static async doLogin(email: string, password: string): Promise<AxiosResponse<any>> {
        return HttpService.post('/v1/auth', { "email": email, "password": password });
    }

    static async refreshToken(): Promise<AxiosResponse<any>> {
        return HttpService.post('/v1/auth/refresh', {});
    }

    static isTokenExpired(): boolean {
        const token = localStorage.getItem('access_token');
        if (token) {
            const tokenData = token.split('.')[1];
            const decodedToken = JSON.parse(atob(tokenData));
            const exp = decodedToken.exp;
            return Date.now() >= exp * 1000;
        }
        return true;
    }
}