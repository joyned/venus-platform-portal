import styled from "styled-components";
import { layout } from "./ui/Variables";

interface ActivityProps {
    children: React.ReactNode | React.ReactNode[];
}

const ActivityComponent = styled.div`
    padding: 10px 15px;
    display: flex;
    align-items: center;
    background-color: ${layout.lightGrey};
    gap: 20px;
    text-align: center;
    justify-content: space-between;
    margin-bottom: 15px;
`

export default function Activity(props: ActivityProps) {
    return (
        <ActivityComponent>
            {props.children}
        </ActivityComponent>
    )
}