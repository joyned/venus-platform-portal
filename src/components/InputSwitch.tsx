import { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "./ui/Variables";

const InputSwitchComponent = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 25px;
    margin-top: 10px;
`

const InputSwitchSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 9px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }
`

const InputSwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${InputSwitchSlider} {
        background-color: ${colors.primary}
    }

    &:checked + ${InputSwitchSlider}:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`

export default function InputSwitch(props: { value?: any, onChange?: (value: any) => void }) {
    const [checked, setChecked] = useState(props.value);

    useEffect(() => {
        setChecked(props.value);
    }, [props.value]);

    return (
        <InputSwitchComponent>
            <InputSwitchInput type="checkbox" checked={checked} onChange={(e) => {
                setChecked(e.target.checked);
                if (props.onChange) {
                    props.onChange(e.target.checked)
                };
            }}></InputSwitchInput>
            <InputSwitchSlider></InputSwitchSlider>
        </InputSwitchComponent>
    )
}