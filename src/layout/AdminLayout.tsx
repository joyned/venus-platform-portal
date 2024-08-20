import { useState } from "react";
import ILeftMenu from "../model/ILeftMenu";
import Layout from "./Layout";

export default function AdminLayout(props: {children: any}) {
    const [menu] = useState<ILeftMenu>({
        menuTitle: "Admin",
        items: [
            {
                title: "Projects",
                uri: "/admin/projects"
            },
            {
                title: "Teams",
                uri: "/admin/teams"
            },
            {
                title: "Person",
                uri: "/admin/person"
            },
            {
                title: "Templates / Programming Languages",
                uri: "/admin/templates"
            }
        ]
    });

    return <Layout leftMenu={menu} displayLeftMenu>{props.children}</Layout>
}