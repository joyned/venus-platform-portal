import { useEffect } from "react";
import { CiLink } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Panel from "../components/Panel";
import DataTable, { TableData, TableRow } from "../components/Table";
import guidGenerator from "../utils/GUIDGenerator";

const sampleData = [
    {
        project: "project-1",
        owner: "Owner 1"
    },
    {
        project: "project-2",
        owner: "Owner 2"
    },
    {
        project: "project-3",
        owner: "Owner 3"
    },
    {
        project: "project-4",
        owner: "Owner 4"
    },
    {
        project: "project-5",
        owner: "Owner 5"
    }
]

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
    })

    const projectPanelButtons = () => {
        return (
            <>
                <Button label="Create a project" icon={<IoIosAdd />} onClick={() => navigate("/new-project")}></Button>
            </>
        )
    }

    const dataTemplate = () => {
        return (
            sampleData.map((data, index) => {
                return (
                    <TableRow key={guidGenerator()}>
                        <TableData key={guidGenerator()}>{data.project}</TableData>
                        <TableData key={guidGenerator()}>{data.owner}</TableData>
                        <TableData key={guidGenerator()}>
                            <Button label="Open" icon={<CiLink />} color="success" onClick={() => navigate(`/${data.project}`)}></Button>
                        </TableData>
                    </TableRow>
                );
            })
        )
    }

    return (
        <Panel title="Projects" buttons={projectPanelButtons()}>
            <span>Projects that I have access or it's my own.</span>
            <DataTable headers={["project", "Owner", "Action"]} dataTemplate={dataTemplate}></DataTable>
        </Panel>
    )
}