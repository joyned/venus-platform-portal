import { IoIosSave } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import FormButtons from "../../components/FormButtons";
import FormItem from "../../components/FormItem";
import Input from "../../components/Input";
import Panel from "../../components/Panel";

export default function ProjectScopeFormPage() {
    const navigate = useNavigate();
    const project = useParams().project;

    return (
        <Panel title="Scope">
            <form>
                <FormItem>
                    <label>Name:</label>
                    <Input type="text"></Input>
                </FormItem>
                <FormItem>
                    <label>Description:</label>
                    <Input type="text"></Input>
                </FormItem>
                <FormButtons align="end">
                    <Button label="Save" type="submit" icon={<IoIosSave />}></Button>
                    <Button label="Cancel" color="danger" icon={<TiCancel />} onClick={() => navigate(`/${project}/scopes`)}></Button>
                </FormButtons>
            </form>
        </Panel>
    )
}