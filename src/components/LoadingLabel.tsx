import styled, { CSSProperties } from "styled-components";

const LoadingLabelComponent = styled.div`
    background-color: #ededed;
    height: 17px;
    border-radius: 3px;
    width: 150px;    
    margin-bottom: 5px;
    background: linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%);
    background-size: 200% 100%;
    background-position-x: 100%;
    animation: 1s loading ease-in-out infinite;

    @keyframes loading {
        to{
            background-position-x: -30%
        }
    }
`

export default function LoadingLabel(props: {style?: CSSProperties}) {
    return (
        <LoadingLabelComponent style={props.style}></LoadingLabelComponent>
    )
}