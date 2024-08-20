import { AxiosResponse } from "axios";
import IProgrammingLanguage from "../model/IProgrammingLanguage";
import HttpService from "./HttpService";

export default class ProgrammingLanguageService {
    private static readonly URI = '/v1/programming-language';


    public static async findAll(): Promise<AxiosResponse<IProgrammingLanguage[]>> {
        return HttpService.get<IProgrammingLanguage[]>(this.URI);
    }

    public static async findById(id: number): Promise<AxiosResponse<IProgrammingLanguage>> {
        return HttpService.get<IProgrammingLanguage>(`${this.URI}/${id}`);
    }

    public static async save(programmingLanguage: IProgrammingLanguage): Promise<AxiosResponse<IProgrammingLanguage>> {
        return HttpService.post<IProgrammingLanguage>(this.URI, programmingLanguage);
    }
}