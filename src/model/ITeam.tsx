import IPerson from "./IPerson";

export default interface ITeam {
    id?: number;
    name: string;
    manager: IPerson,
    active: boolean;
    createdAt?: Date,
    members?: IPerson[];
}