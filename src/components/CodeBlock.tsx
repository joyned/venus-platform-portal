import { ReactNode } from "react";
import styled from "styled-components";
import { layout } from "./ui/Variables";

const CodeBlockComponent = styled.pre`
    background-color: ${layout.lightGrey};
    padding: 20px;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-direction: column;
`

export default function CodeBlock(props: { children: ReactNode | ReactNode[] }) {
    return (
        <CodeBlockComponent>
            {props.children}
        </CodeBlockComponent>
    )
}