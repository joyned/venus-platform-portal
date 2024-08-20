import { AxiosResponse } from "axios";
import IPerson from "../model/IPerson";
import HttpService from "./HttpService";

export default class PersonService {
    private static readonly PERSON_URI = '/v1/person';

    public static async search(email: string): Promise<AxiosResponse<IPerson[]>> {
        return HttpService.get<IPerson[]>(`${PersonService.PERSON_URI}/search?email=${email}`);
    }

    public static async getPeople(): Promise<AxiosResponse<IPerson[]>> {
        return HttpService.get<IPerson[]>(PersonService.PERSON_URI);
    }

    public static async getPerson(id: number): Promise<AxiosResponse<IPerson>> {
        return HttpService.get<IPerson>(`${PersonService.PERSON_URI}/${id}`);
    }

    public static async findByTeamId(teamId: number): Promise<AxiosResponse<IPerson[]>> {
        return HttpService.get<IPerson[]>(`${PersonService.PERSON_URI}/team/${teamId}`);
    }

    public static async savePerson(person: IPerson): Promise<AxiosResponse<IPerson>> {
        return HttpService.post<IPerson>(PersonService.PERSON_URI, person);
    }
}