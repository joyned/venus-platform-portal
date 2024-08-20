import { useState } from "react";
import { FaLink } from "react-icons/fa";
import styled from "styled-components";
import Activity from "../../components/Activity";
import Button from "../../components/Button";
import CodeBlock from "../../components/CodeBlock";
import PageHeader from "../../components/PageHeader";
import Panel from "../../components/Panel";
import ResponsiveGrid from "../../components/ResponsiveGrid";
import Tag from "../../components/Tag";
import { useLoading } from "../../components/Loading";
import Label from "../../components/Label";

const ProjectInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

`

export default function ProjectSummaryPage() {
    const { setLoading } = useLoading();
    const [createdAt] = useState<Date>(new Date());

    useState(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    });

    return (
        <>
            <PageHeader title="Summary"></PageHeader>
            <ResponsiveGrid columns={1}>
                <Panel title="project-1">
                    <ProjectInfo>
                        <div style={{ width: "50%" }}>
                            <p style={{ display: "flex", gap: "10px" }}>
                                <strong>Create at:</strong>
                                <Label hasLoading>{createdAt.toUTCString()}</Label>
                            </p>
                            <p style={{ display: "flex", gap: "10px" }}>
                                <strong>Project:</strong>
                                <Label hasLoading>project-1</Label>
                            </p>
                            <p style={{ display: "flex", gap: "10px" }}>
                                <strong>Team:</strong>
                                <Label hasLoading>management</Label>
                            </p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Button label="Open" icon={<FaLink></FaLink>}></Button>
                        </div>
                    </ProjectInfo>
                </Panel>
            </ResponsiveGrid>
            <ResponsiveGrid columns={2}>
                <Panel title="Activities">
                    <Activity>
                        <Tag name="Deployment" tagStyle="primary" width="110px"></Tag>
                        <label>updating forms</label>
                        <label>11 hours ago</label>
                    </Activity>
                    <Activity>
                        <Tag name="Alarm" tagStyle="warning" width="110px"></Tag>
                        <label>[High CPU usage]</label>
                        <label>2 hours ago</label>
                    </Activity>
                </Panel>
                <Panel title="Development Startup">
                    <CodeBlock>
                        <label>git clone ...</label>
                        <label>cd ...</label>
                        <label>nvm use</label>
                        <label>npm install</label>
                        <label>npm start</label>
                    </CodeBlock>
                </Panel>
            </ResponsiveGrid>
            <Panel title="Performance">
            </Panel>
        </>
    )
}