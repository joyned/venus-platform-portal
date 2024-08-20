import { IoIosAdd } from "react-icons/io";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import DataTable from "../components/Table";
import { useNavigate } from "react-router-dom";

interface DataTablePageProps {
    title: string;
    subtitle?: string;
    hasAddButton?: boolean;
    tableHeaders: string[];
    tableTemplate: any;
    baseUri: string;
    children?: any;
}

export default function DataTablePage(props: DataTablePageProps) {
    const navigate = useNavigate();

    const teamPanelButtons = () => {
        return (
            <>
                <Button label="Add" icon={<IoIosAdd />} onClick={() => navigate(`${props.baseUri}/${0}`)}></Button>
            </>
        )
    }
    return (
        <>
            <PageHeader title={props.title}></PageHeader>
            <Panel buttons={props.hasAddButton && teamPanelButtons()}>
                <span>{props.subtitle}</span>
                <DataTable headers={props.tableHeaders} dataTemplate={props.tableTemplate}></DataTable>
            </Panel>
        </>
    )
}