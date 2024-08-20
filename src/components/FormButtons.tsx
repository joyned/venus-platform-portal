import { CSSProperties, ReactElement } from "react"
import styled from "styled-components"

interface FormButtonsProps {
    align?: "start" | "center" | "end" | "space-between"
}

const FormButtonsComponent = styled.div<FormButtonsProps>`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: ${props => props.align || "start"};
`

export default function FormButtons(props: { style?: CSSProperties, children?: ReactElement | ReactElement[], align?: "start" | "center" | "end" | "space-between" }) {
    return (
        <FormButtonsComponent align={props.align} style={props.style}>
            {props.children}
        </FormButtonsComponent>
    )
}