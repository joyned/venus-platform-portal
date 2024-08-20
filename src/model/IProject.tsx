import IProgrammingLanguage from "./IProgrammingLanguage";
import ITeam from "./ITeam";

export default interface IProject {
    id?: number;
    name: string;
    description: string;
    programmingLanguage: IProgrammingLanguage;
    team: ITeam;
    repositoryUrl?: string;
    projectUrl?: string;
    active: boolean;
    createdAt?: Date;
}