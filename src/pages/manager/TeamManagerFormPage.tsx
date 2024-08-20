import { useEffect, useState } from "react";
import { CiLink } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AutoComplete from "../../components/AutoComplete";
import Button from "../../components/Button";
import FormButtons from "../../components/FormButtons";
import FormItem from "../../components/FormItem";
import Label from "../../components/Label";
import { useLoading } from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import Panel from "../../components/Panel";
import DataTable, { TableData, TableRow } from "../../components/Table";
import IPerson from "../../model/IPerson";
import ITeam from "../../model/ITeam";
import PersonService from "../../service/PersonService";
import TeamService from "../../service/TeamService";
import UUIDService from "../../service/UUIDService";

export default function TeamManagerFormPage() {
    const params = useParams();
    const { setLoading } = useLoading();

    const [team, setTeam] = useState<ITeam>();
    const [newPerson, setNewPerson] = useState<IPerson>();

    useEffect(() => {
        setLoading(true);
        async function loadData() {
            try {
                if (params.id && params.id !== '0') {
                    const response = await TeamService.getTeam(parseInt(params.id), true);
                    const peopleResponse = await PersonService.findByTeamId(parseInt(params.id));
                    setTeam({ ...response.data, members: peopleResponse.data });
                }
            } catch (error) {
                toast.error('Error loading team data');
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [params.id, setLoading])

    const dataTemplate = () => {
        return (
            team?.members?.map((data) => {
                return (
                    <TableRow key={UUIDService.generateUUID()}>
                        <TableData key={UUIDService.generateUUID()}>{data.name}</TableData>
                        <TableData key={UUIDService.generateUUID()}>
                            <Button label="" icon={<CiLink />} color="danger"></Button>
                        </TableData>
                    </TableRow>
                )
            })
        )
    }

    const fetchSuggestions = async (query: string) => {
        setLoading(true);
        const response = await PersonService.search(query);
        setLoading(false);
        return response.data;
    }

    const onAdd = async (e: any) => {
        e.preventDefault();
        console.log(newPerson);
    }

    return (
        <>
            <PageHeader title={team ? team.name : 'Team'} />
            <Panel>
                <form onSubmit={(e) => onAdd(e)}>
                    <FormItem>
                        <Label>New Member:</Label>
                        <AutoComplete fetchSuggestions={(query) => fetchSuggestions(query)} suggestionLabel="email"
                            onSelect={(e: any) => setNewPerson(e)}></AutoComplete>
                    </FormItem>
                    <FormButtons>
                        <Button label="Add" type="submit"></Button>
                    </FormButtons>
                </form>
            </Panel>
            <Panel title="People">
                <DataTable headers={['Name', 'Action']} dataTemplate={dataTemplate}></DataTable>
            </Panel>
        </>
    )
}