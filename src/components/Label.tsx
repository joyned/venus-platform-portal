import styled from "styled-components";
import { useLoading } from "./Loading";
import LoadingLabel from "./LoadingLabel";

interface LabelProps {
    hasLoading?: boolean,
    children?: any
}

const LabelComponent = styled.label`
    
`

export default function Label(props: LabelProps) {
    const { loading } = useLoading();
    return (
        <>
            {loading && props.hasLoading ? <LoadingLabel></LoadingLabel> : <LabelComponent>{props.children}</LabelComponent>}
        </>
    )
}