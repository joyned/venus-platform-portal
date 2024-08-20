import { AxiosResponse } from "axios";
import IRole from "../model/IRole";
import HttpService from "./HttpService";

export default class RoleService {
    private static readonly ROLE_URI = '/v1/role';

    public static async getRoles(): Promise<AxiosResponse<IRole[]>> {
        return HttpService.get<IRole[]>(RoleService.ROLE_URI);
    }

}