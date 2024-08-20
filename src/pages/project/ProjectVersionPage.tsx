import { IoIosAdd } from "react-icons/io";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import Panel from "../../components/Panel";
import DataTable, { TableData, TableRow } from "../../components/Table";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { useState } from "react";


const sampleData = [
    {
        version: '1.0.0',
        releaseNotes: 'First version',
        date: '2021-08-01'
    },
    {
        version: '1.0.1',
        releaseNotes: 'Second version',
        date: '2021-08-02'
    }
]

export default function ProjectVersionPage() {
    const navigate = useNavigate();
    const project = useParams().project;
    const [releaseNotesModalOpen, setReleaseNotesModalOpen] = useState(false);
    const [selectedVersion, setSelectedVersion] = useState<any>(undefined);

    const panelButtons = () => {
        return (
            <>
                <Button label="New version" icon={<IoIosAdd />} onClick={() => navigate(`/${project}/versions/${0}`)}></Button>
            </>
        )
    }

    const dataTemplate = () => {
        return (
            sampleData.map((data, index) => {
                return (
                    <TableRow key={index}>
                        <TableData key={index}>{data.version}</TableData>
                        <TableData key={index}><MdOutlineSpeakerNotes onClick={() => onOpenModal(data)} /></TableData>
                        <TableData key={index}>{data.date}</TableData>
                    </TableRow>
                )
            })
        )
    }

    const onOpenModal = (selectedData: any) => {
        setSelectedVersion(selectedData);
        setReleaseNotesModalOpen(true);
    }

    return (
        <>
            <PageHeader title="Versions"></PageHeader>
            <Panel buttons={panelButtons()}>
                <span>Define what versions your project has. The versions are used on deploy.</span>
                <DataTable headers={["Version", "Release Notes", "Date"]} dataTemplate={dataTemplate}></DataTable>
            </Panel>
            <Modal isOpen={releaseNotesModalOpen} onClose={() => setReleaseNotesModalOpen(false)} title={selectedVersion?.version}>
                <span>{selectedVersion?.releaseNotes}</span>
            </Modal>
        </>
    )
}