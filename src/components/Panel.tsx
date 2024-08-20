import styled from "styled-components";
import { layout } from "./ui/Variables";

interface PanelProps {
    title?: string;
    children?: React.ReactNode | React.ReactNode[];
    buttons?: React.ReactNode | React.ReactNode[];
    width?: string;
}

const PanelComponent = styled.div<{ $width?: string }>`
    background-color: ${layout.white};
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: ${props => props.$width || '100%'};
    margin-bottom: 20px;
`

const PanelTitle = styled.h1`
    font-weight: 500;
    margin-bottom: 20px;
`

const PanelBody = styled.div`
    margin-bottom: 10px;
`

const PanelButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`

export default function Panel(props: PanelProps) {
    return (
        <PanelComponent $width={props.width}>
            {props.title && <PanelTitle>{props.title}</PanelTitle>}
            <PanelBody>
                {props.children}
            </PanelBody>
            {props.buttons && <PanelButtons>{props.buttons}</PanelButtons>}
        </PanelComponent>
    )
}