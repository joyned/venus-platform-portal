import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import IRole from "../../model/IRole";
import PersonService from "../../service/PersonService";
import RoleService from "../../service/RoleService";
import TeamService from "../../service/TeamService";
import ITeam from "../../model/ITeam";
import { toast } from "react-toastify";

export default function PersonFormPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const params = useParams();
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [active, setActive] = useState<boolean>(true);
    const [createdAt, setCreatedAt] = useState<any>(null);
    const [role, setRole] = useState<IRole>();
    const [team, setTeam] = useState<ITeam>();

    const [roleOptions, setRoleOptions] = useState<IRole[]>([]);
    const [teamOptions, setTeamOptions] = useState<ITeam[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const teamsResponse = await TeamService.getTeams();
                setTeamOptions(teamsResponse.data);

                const rolesResponse = await RoleService.getRoles();
                setRoleOptions(rolesResponse.data);

                if (params.id && params.id !== "0") {
                    const personResponse = await PersonService.getPerson(parseInt(params.id));
                    setId(parseInt(params.id));
                    setName(personResponse.data.name);
                    setEmail(personResponse.data.email);
                    setActive(personResponse.data.active);
                    setRole(personResponse.data.role);
                    if (personResponse.data.createdAt) {
                        setCreatedAt(new Date(personResponse.data.createdAt));
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

    const onSubmit = (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        if (role) {
            const person = {
                id: id,
                name: name,
                email: email,
                active: active,
                createdAt: createdAt,
                team: team,
                role: role
            }
            PersonService.savePerson(person).then(() => {
                toast.success('Saved Successfully!');
                setLoading(false);
                navigate('/admin/person');
            })
        }
    }

    return (
        <>
            <PageHeader title={name || 'New Person'}></PageHeader>
            <Panel>
                <form onSubmit={(e) => onSubmit(e)}>
                    <FormItem>
                        <Label>Name:</Label>
                        <Input type="text" value={name} onChange={(value) => setName(value)} ></Input>
                    </FormItem>
                    <FormItem>
                        <Label>Email:</Label>
                        <Input type="email" value={email} onChange={(value) => setEmail(value)} ></Input>
                    </FormItem>
                    <FormItem>
                        <Label>Team:</Label>
                        <Select options={teamOptions} value={team} onChange={(value) => setTeam(value)} />
                    </FormItem>
                    <FormItem>
                        <Label>Role:</Label>
                        <Select options={roleOptions} value={role} onChange={(value) => setRole(value)} />
                    </FormItem>
                    <FormItem>
                        <Label>Active:</Label>
                        <InputSwitch value={active} onChange={(value) => setActive(value)}></InputSwitch>
                    </FormItem>
                    <FormButtons align="end">
                        <Button label="Save" type="submit"></Button>
                        <Button label="Cancel" type="button" color="danger" onClick={() => navigate('/admin/person')}></Button>
                    </FormButtons>
                </form>
            </Panel>
        </>
    )
}