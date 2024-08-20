import { CiLink } from "react-icons/ci";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import Panel from "../../components/Panel";
import DataTable, { TableData, TableRow } from "../../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const sampleData = [
    {
        scope: 'scope-1',
        description: 'scope-1 description',
    },
    {
        scope: 'scope-2',
        description: 'scope-2 description',
    }
]

export default function ProjectScopePage() {
    const navigate = useNavigate();
    const project = useParams().project;

    const projectPanelButtons = () => {
        return (
            <>
                <Button label="New scope" icon={<IoIosAdd />} onClick={() => navigate(`/${project}/scopes/${0}`)}></Button>
            </>
        )
    }

    const dataTemplate = () => {
        return (
            sampleData.map((data, index) => {
                return (
                    <TableRow key={index}>
                        <TableData key={index}>{data.scope}</TableData>
                        <TableData key={index}>{data.description}</TableData>
                        <TableData key={index}>
                            <Button label="Open" icon={<CiLink />} color="success" onClick={() => navigate(`/${project}/scopes/${0}`)}></Button>
                        </TableData>
                    </TableRow>
                )
            })
        )
    }

    return (
        <>
            <PageHeader title="Scopes"></PageHeader>
            <Panel buttons={projectPanelButtons()}>
                <span>Define what scopes your project has. The scopes are used on deploy.</span>
                <DataTable headers={['Scope', 'Description', 'Action']} dataTemplate={dataTemplate}></DataTable>
            </Panel>
        </>
    )
}