import { useState } from "react";
import ILeftMenu from "../model/ILeftMenu";
import Layout from "./Layout";

export default function ManagerLayout(props: {children: any}) {
    const [menu] = useState<ILeftMenu>({
        menuTitle: "Manager",
        items: [
            {
                title: "Workflow",
                uri: "/manager/workflow"
            },
            {
                title: "Team",
                uri: "/manager/my-team"
            }
        ]
    });

    return <Layout leftMenu={menu} displayLeftMenu>{props.children}</Layout>
}