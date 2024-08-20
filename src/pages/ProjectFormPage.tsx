import { useEffect, useState } from "react";
import { IoIosSave } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormButtons from "../components/FormButtons";
import FormItem from "../components/FormItem";
import Input from "../components/Input";
import Panel from "../components/Panel";
import ResponsiveGrid from "../components/ResponsiveGrid";
import Select from "../components/Select";
import IProgrammingLanguage from "../model/IProgrammingLanguage";
import ProgrammingLanguageService from "../service/ProgrammingLanguageService";

export default function ProjectFormPage() {
    const navigate = useNavigate();
    const [programmingLanguagesOptions, setProgrammingLanguagesOptions] = useState<IProgrammingLanguage[]>([]);

    useEffect(() => {
        async function loadData() {
            const progLangResponse = await ProgrammingLanguageService.findAll();
            setProgrammingLanguagesOptions(progLangResponse.data);
        }
        loadData();
    }, [])


    return (
        <ResponsiveGrid columns={1} center>
            <form>
                <Panel title="Project" width="70vw">
                    <FormItem>
                        <label>Project Name:</label>
                        <Input type="text"></Input>
                    </FormItem>
                    <FormItem>
                        <label>Descripton:</label>
                        <Input type="text"></Input>
                    </FormItem>
                    <FormItem>
                        <label>Language:</label>
                        <Select options={programmingLanguagesOptions}></Select>
                    </FormItem>
                    <FormButtons align="end">
                        <Button label="Create" type="submit" icon={<IoIosSave/>}></Button>
                        <Button label="Cancel" color="danger" icon={<TiCancel/>} onClick={() => navigate("/")}></Button>
                    </FormButtons>
                </Panel>
            </form>
        </ResponsiveGrid>
    )
}