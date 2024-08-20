import { ReactElement } from "react";

export default interface IMenuItem {
    title: string;
    uri: string;
    icon?: ReactElement;
    accessRole?: string[];
}