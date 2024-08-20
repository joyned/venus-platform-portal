import { ReactElement } from "react";
import styled from "styled-components";

export const FormComponent = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
`

export default function FormItem(props: { children?: ReactElement | ReactElement[] }) {
    return (
        <FormComponent>
            {props.children}
        </FormComponent>
    )
}