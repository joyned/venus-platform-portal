import { AxiosResponse } from "axios";
import IProject from "../model/IProject";
import HttpService from "./HttpService";

export default class ProjectService {
    private static readonly URI = '/v1/project';

    public static async getProjects(): Promise<AxiosResponse<IProject[]>> {
        return HttpService.get<IProject[]>(ProjectService.URI);
    }
}