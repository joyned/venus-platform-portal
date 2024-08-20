import { CiLink } from "react-icons/ci";
import Button from "../../components/Button";
import { TableData, TableRow } from "../../components/Table";
import IPerson from "../../model/IPerson";
import DataTablePage from "../../shared/DataTablePage";
import { useEffect, useState } from "react";
import PersonService from "../../service/PersonService";
import { useNavigate } from "react-router-dom";
import UUIDService from "../../service/UUIDService";
import { useLoading } from "../../components/Loading";

export default function PersonPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [people, setPeople] = useState<IPerson[]>([]);

    useEffect(() => {
        setLoading(true);
        PersonService.getPeople().then(response => {
            setPeople(response.data);
        }).finally(() => setLoading(false))
    }, [setLoading])

    const dataTemplate = () => {
        return (
            people.map((data) => {
                return (
                    <TableRow key={UUIDService.generateUUID()}>
                        <TableData key={UUIDService.generateUUID()}>{data.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>{data.email}</TableData>
                        <TableData key={UUIDService.generateUUID()}>{data.team?.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>
                            <Button label="View" icon={<CiLink />} color="success" onClick={() => navigate(`/admin/person/${data.id}`)}></Button>
                        </TableData>
                    </TableRow>
                )
            })
        )
    }

    return <DataTablePage title="Person"
        baseUri="/admin/person"
        tableHeaders={['Name', 'Email', 'Team', 'Actions']}
        tableTemplate={dataTemplate}
        hasAddButton>
    </DataTablePage>
}