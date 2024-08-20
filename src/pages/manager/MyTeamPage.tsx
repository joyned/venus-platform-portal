import { useEffect, useState } from "react";
import ITeam from "../../model/ITeam";
import { TableData, TableRow } from "../../components/Table";
import DataTablePage from "../../shared/DataTablePage";
import TeamService from "../../service/TeamService";
import { useLoading } from "../../components/Loading";
import UUIDService from "../../service/UUIDService";
import { CiLink } from "react-icons/ci";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function MyTeamPage() {
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [teams, setTeams] = useState<ITeam[]>([]);

    useEffect(() => {
        setLoading(true);
        TeamService.myTeam().then(response => {
            setTeams(response.data);
            setLoading(false);
        });
    }, [setLoading])

    const dataTemplate = () => {
        return (
            teams.map((data) => {
                return (
                    <TableRow key={UUIDService.generateUUID()}>
                        <TableData key={UUIDService.generateUUID()}>{data.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>
                            <Button label="View" icon={<CiLink />} color="success" onClick={() => navigate(`/manager/my-team/${data.id}`)}></Button>
                        </TableData>
                    </TableRow>
                )
            })
        )
    }

    return (
        <>
            <DataTablePage title="My Team"
                baseUri="/manager/my-team"
                tableHeaders={['Name', 'Actions']}
                tableTemplate={dataTemplate}>
            </DataTablePage>
        </>
    )
}