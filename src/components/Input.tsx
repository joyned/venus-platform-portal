import styled from "styled-components"
import { useLoading } from "./Loading"
import { font, layout } from "./ui/Variables"

interface InputProps {
    transsparent?: boolean
    loading?: boolean
    iconAlign?: 'left' | 'right'
}

const InputComponent = styled.div`
    width: 100%;
    position: relative;
`

const InputField = styled.input<InputProps>`
    background-color: transparent;
    border: solid 1px ${layout.inputBorder};
    border-radius: 5px;
    padding: 10px 16px;
    margin: 10px 0;
    ${props => props.iconAlign === 'left' ? 'padding-left: 40px;' : 'padding-right: 40px;'}
    width: 100%;
    font-size: ${font.textFontSize};
    color: ${font.textColor};
    &:hover {
        cursor: ${props => props.loading ? 'not-allowed' : 'auto'};
    }
`;

const InputFieldIcon = styled.div<{ align?: string }>`
    position: absolute;
    top: 22px;
    ${props => props.align === 'right' ? 'right: 8px;' : 'left: 8px;'}
    display: flex;
    align-items: center;
`;

export default function Input(props: {
    placeholder?: string,
    value?: string, type?: 'text' | 'password' | 'date' | 'number' | 'email' | 'textarea',
    onChange?: (value: string) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    transparent?: boolean,
    style?: React.CSSProperties,
    disabled?: boolean,
    required?: boolean,
    disableLoading?: boolean,
    icon?: any,
    iconAlign?: 'left' | 'right'
}) {
    const { loading } = useLoading();
    return (
        <InputComponent>
            {props.icon && <InputFieldIcon style={{ width: props.icon.type === 'img' ? '16px' : '' }} align={props.iconAlign}>
                {props.icon}
            </InputFieldIcon>
            }
            <InputField type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(e) => { props.onChange && props.onChange(e.target.value) }}
                onAbort={props.onKeyDown}
                transsparent={props.transparent}
                style={props.style}
                disabled={props.disabled || (loading && !props.disableLoading)}
                required={props.required}
                loading={loading && !props.disableLoading}
                iconAlign={props.iconAlign}
            >
            </InputField>
        </InputComponent>
    )
}