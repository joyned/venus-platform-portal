import { AxiosResponse } from "axios";
import ITeam from "../model/ITeam";
import HttpService from "./HttpService";

export default class TeamService {

    private static readonly TEAM_URL = '/v1/team';

    static async getTeams(): Promise<AxiosResponse<ITeam[]>> {
        return HttpService.get<ITeam[]>(this.TEAM_URL)
    }

    static async getTeam(id: number, fetchMembers: boolean = false): Promise<AxiosResponse<ITeam>> {
        return HttpService.get<ITeam>(`${this.TEAM_URL}/${id}?fetchMembers=${fetchMembers}`)
    }

    static async saveTeam(team: ITeam) {
        return HttpService.post(this.TEAM_URL, team)
    }

    static async myTeam(): Promise<AxiosResponse<ITeam[]>> {
        return HttpService.get<ITeam[]>(`${this.TEAM_URL}/my-teams`)
    }
}