import { CiLink } from "react-icons/ci"
import Button from "../../components/Button"
import FormButtons from "../../components/FormButtons"
import { TableData, TableRow } from "../../components/Table"
import IApprovalWorkflow from "../../model/IApprovalWorkflow"
import DataTablePage from "../../shared/DataTablePage"
import { useEffect, useState } from "react"
import WorkflowService from "../../service/ApprovalWorkflowService"

export default function WorkflowPage() {
    const [workflow, setWorkflow] = useState<IApprovalWorkflow[]>([]);

    useEffect(() => {
        WorkflowService.getApprovalWorkflows().then(response => {
            setWorkflow(response.data);
        });
    }, [])

    const dataTemplate = () => {
        return (
            workflow.map((data, index) => {
                return (
                    <TableRow key={index}>
                        <TableData key={index}>{data.project.name}</TableData>
                        <TableData key={index}>{data.status}</TableData>
                        <TableData key={index}>
                            <FormButtons>
                                <Button label="Approve" icon={<CiLink />} color="success"></Button>
                                <Button label="Reject" icon={<CiLink />} color="danger"></Button>
                            </FormButtons>
                        </TableData>
                    </TableRow>
                )
            })
        )
    }
    return (
        <>
            <DataTablePage title="Workflow"
                baseUri="/manager/workflow"
                tableHeaders={['Project', 'Status', 'Action']}
                tableTemplate={dataTemplate}>
            </DataTablePage>
        </>
    )
}