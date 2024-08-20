import styled from "styled-components";
import { colors } from "./ui/Variables";

interface TagProps {
    name: string;
    tagStyle?: "primary" | "success" | "danger" | "warning";
    width?: string;
}

interface Colors {
    [key: string]: string;
}

const TagComponent = styled.div<{ $backgroundColor: string, $width?: string }>`
    padding: 10px;
    background-color: ${(props) => (colors as Colors)[props.$backgroundColor]};
    color: white;
    border-radius: 30px;
    width: ${(props) => props.$width};
`

export default function Tag(props: TagProps) {
    return (
        <TagComponent $backgroundColor={props.tagStyle || 'primary'} $width={props.width || 'fit-content'}>
            {props.name}
        </TagComponent>
    )
}