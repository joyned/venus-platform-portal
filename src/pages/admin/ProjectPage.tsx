import { useEffect, useState } from "react";
import { CiLink } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useLoading } from "../../components/Loading";
import { TableData, TableRow } from "../../components/Table";
import IProject from "../../model/IProject";
import UUIDService from "../../service/UUIDService";
import DataTablePage from "../../shared/DataTablePage";
import ProjectService from "../../service/ProjectService";

export default function ProjectPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjects().then((response) => {
            setProjects(response.data);
            setLoading(false);
        });
    }, [setLoading]);

    const dataTemplate = () => {
        return (
            projects.map((data) => {
                return (
                    <TableRow key={UUIDService.generateUUID()}>
                        <TableData key={UUIDService.generateUUID()}>{data.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>{data.team.manager.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>{data.programmingLanguage.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>
                            <Button label="View" icon={<CiLink />} color="success" onClick={() => navigate(`/admin/projects/${data.id}`)}></Button>
                        </TableData>
                    </TableRow>
                )
            })
        )
    }
    return (
        <>
            <DataTablePage title="Project"
                baseUri="/admin/projects"
                tableHeaders={['Project', 'Manager', 'Language', 'Actions']}
                tableTemplate={dataTemplate}
                hasAddButton>
            </DataTablePage>
        </>
    )
}