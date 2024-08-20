import { CiLink } from "react-icons/ci";
import Button from "../../components/Button";
import { TableData, TableRow } from "../../components/Table";
import ITeam from "../../model/ITeam";
import DataTablePage from "../../shared/DataTablePage";
import { useEffect, useState } from "react";
import TeamService from "../../service/TeamService";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../components/Loading";
import UUIDService from "../../service/UUIDService";

export default function TeamPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [teams, setTeams] = useState<ITeam[]>([]);

    useEffect(() => {
        setLoading(true);
        TeamService.getTeams().then(response => {
            setTeams(response.data);
        }).finally(() => setLoading(false))
    }, [setLoading])

    const dataTemplate = () => {
        return (
            teams.map((data) => {
                return (
                    <TableRow key={UUIDService.generateUUID()}>
                        <TableData key={UUIDService.generateUUID()}>{data.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>{data.manager.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>
                            <Button label="View" icon={<CiLink />} color="success" onClick={() => navigate(`/admin/teams/${data.id}`)}></Button>
                        </TableData>
                    </TableRow>
                )
            })
        )
    }

    return (
        <>
            <DataTablePage title="Teams"
                baseUri="/admin/teams"
                tableHeaders={['Team', 'Manager', 'Actions']}
                tableTemplate={dataTemplate}
                hasAddButton>
            </DataTablePage>
        </>
    )
}