import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../../components/Loading";
import ProgrammingLanguageService from "../../service/ProgrammingLanguageService";
import { toast } from "react-toastify";
import PageHeader from "../../components/PageHeader";
import Panel from "../../components/Panel";
import FormInput from "../../components/FormInput";
import FormButtons from "../../components/FormButtons";
import Button from "../../components/Button";

export default function LanguageTemplatesFormPage() {
    const navigate = useNavigate();
    const params = useParams();
    const { setLoading } = useLoading();
    const [id, setId] = useState<number>();
    const [name, setName] = useState("");
    const [active, setActive] = useState(true);
    const [templateLink, setTemplateLink] = useState("");
    const [createdAt, setCreatedAt] = useState<Date>();

    useEffect(() => {
        setLoading(true);
        async function loadData() {
            try {
                const id = parseInt(params.id || "0");
                if (id === 0) {
                    return;
                }
                const response = await ProgrammingLanguageService.findById(id);
                const data = response.data;
                setId(id);
                setName(data.name);
                setActive(data.active);
                setTemplateLink(data.templateLink);
                if (data.createdAt) {
                    setCreatedAt(new Date(data.createdAt));
                }
            } catch (error) {
                toast.error("Error loading data: " + error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [params.id, setLoading]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            id,
            name,
            active,
            templateLink,
            createdAt
        }

        setLoading(true);
        try {
            await ProgrammingLanguageService.save(data);
            toast.success("Data saved successfully");
            navigate("/admin/templates");
        } catch (error) {
            toast.error("Error saving data: " + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <PageHeader title={name || "Programming Language"}></PageHeader>
            <Panel>
                <form onSubmit={(e) => onSubmit(e)}>
                    <FormInput label="Name" type="text" value={name} onChange={(value) => setName(value)}></FormInput>
                    <FormInput label="Template Link" type="text" value={templateLink} onChange={(value) => setTemplateLink(value)}></FormInput>
                    <FormInput label="Active" type="switch" value={active} onChange={(value) => setActive(value)}></FormInput>
                    <FormButtons align="end">
                        <Button label="Save" type="submit" hasLoading></Button>
                        <Button label="Cancel" type="button" onClick={() => navigate("/admin/templates")} color="danger"></Button>
                    </FormButtons>
                </form>
            </Panel>
        </>
    )

}