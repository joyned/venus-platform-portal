import { useState } from "react";
import { useParams } from "react-router-dom";
import ILeftMenu from "../model/ILeftMenu";
import Layout from "./Layout";

export default function ProjectLayout(props: {children: any}) {
    const [project] = useState<string | undefined>(useParams().project);
    const [menu] = useState<ILeftMenu>({
        menuTitle: "Project",
        items: [
            {
                title: "Summary",
                uri: `/${project}`
            },
            {
                title: "Scopes",
                uri: `/${project}/scopes`
            },
            {
                title: "Versions",
                uri: `/${project}/versions`
            },
            {
                title: "Alerts",
                uri: ""
            },
            {
                title: "Authorizations",
                uri: ""
            },
            {
                title: "Settings",
                uri: ""
            }
        ]
    })

    return <Layout leftMenu={menu} displayLeftMenu>{props.children}</Layout>
}