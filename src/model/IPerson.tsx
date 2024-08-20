import IRole from "./IRole";
import ITeam from "./ITeam";

export default interface IPerson {
    id?: number;
    name: string;
    email: string;
    active: boolean;
    createdAt?: Date
    team?: ITeam;
    role: IRole
}