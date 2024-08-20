import { useEffect, useState } from "react";
import { CiLink } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useLoading } from "../../components/Loading";
import { TableData, TableRow } from "../../components/Table";
import IProgrammingLanguage from "../../model/IProgrammingLanguage";
import UUIDService from "../../service/UUIDService";
import DataTablePage from "../../shared/DataTablePage";
import ProgrammingLanguageService from "../../service/ProgrammingLanguageService";

export default function LanguageTemplatesPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [programmingLanguages, setProgrammingLanguages] = useState<IProgrammingLanguage[]>([]);

    useEffect(() => {
        setLoading(true);
        async function loadData() {
            const response = await ProgrammingLanguageService.findAll();
            setProgrammingLanguages(response.data);
            setLoading(false);
        }
        loadData();
    }, [setLoading])

    const dataTemplate = () => {
        return (
            programmingLanguages.map((data) => {
                return (
                    <TableRow key={UUIDService.generateUUID()}>
                        <TableData key={UUIDService.generateUUID()}>{data.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>{data.templateLink}</TableData>
                        <TableData key={UUIDService.generateUUID()}>
                            <Button label="View" icon={<CiLink />} color="success" onClick={() => navigate(`/admin/templates/${data.id}`)}></Button>
                        </TableData>
                    </TableRow>
                )
            })
        )
    }

    return <DataTablePage title="Templates / Programming Languages"
        baseUri="/admin/templates"
        tableHeaders={['Name', 'Template URL', 'Actions']}
        tableTemplate={dataTemplate}
        hasAddButton>
    </DataTablePage>
}