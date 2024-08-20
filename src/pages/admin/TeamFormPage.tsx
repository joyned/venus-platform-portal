import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import FormButtons from "../../components/FormButtons";
import FormItem from "../../components/FormItem";
import Input from "../../components/Input";
import InputSwitch from "../../components/InputSwitch";
import Label from "../../components/Label";
import { useLoading } from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import Panel from "../../components/Panel";
import Select from "../../components/Select";
import IPerson from "../../model/IPerson";
import ITeam from "../../model/ITeam";
import PersonService from "../../service/PersonService";
import TeamService from "../../service/TeamService";

export default function TeamFormPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const params = useParams();
    const [id, setId] = useState<number | undefined>(0);
    const [name, setName] = useState<string>('');
    const [manager, setManager] = useState<IPerson | undefined>();
    const [active, setActive] = useState<boolean>(true);
    const [createdAt, setCreatedAt] = useState<any>(undefined);
    const [personOptions, setPersonOptions] = useState<IPerson[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const peopleResponse = await PersonService.getPeople();
                setPersonOptions(peopleResponse.data);

                if (params.id && params.id !== "0") {
                    const teamResponse = await TeamService.getTeam(parseInt(params.id));
                    setId(teamResponse.data.id);
                    setName(teamResponse.data.name);
                    setManager(teamResponse.data.manager);
                    setActive(teamResponse.data.active);
                    if (teamResponse.data.createdAt) {
                        setCreatedAt(new Date(teamResponse.data.createdAt));
                    }
                }
            } catch (error) {
                toast.error('Failed to load data. Please, contact support.');
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [params.id, setLoading])

    const onSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (manager) {
            const team: ITeam = {
                id,
                name,
                manager,
                active,
                createdAt
            }
            TeamService.saveTeam(team).then(() => {
                toast.success('Saved successfully!');
                navigate('/admin/teams');
            }).catch((error) => {
                console.error(error);
            }).finally(() => setLoading(false));
        }
    }

    return (
        <>
            <PageHeader title={name || 'New Team'}></PageHeader>
            <Panel>
                <form onSubmit={(e) => onSubmit(e)}>
                    <FormItem>
                        <Label>Team Name:</Label>
                        <Input type="text" value={name} onChange={(value) => setName(value)}></Input>
                    </FormItem>
                    <FormItem>
                        <Label>Manager:</Label>
                        <Select options={personOptions} value={manager} onChange={(value) => setManager(value)}></Select>
                    </FormItem>
                    <FormItem>
                        <Label>Active:</Label>
                        <InputSwitch value={active} onChange={(value) => setActive(value)}></InputSwitch>
                    </FormItem>
                    <FormButtons align="end">
                        <Button label="Save" type="submit"></Button>
                        <Button label="Cancel" type="button" color="danger" onClick={() => navigate('/admin/teams')}></Button>
                    </FormButtons>
                </form>
            </Panel>
        </>
    )
}