import React, { ReactElement } from "react";
import styled from "styled-components";
import { colors, font } from "./ui/Variables";
import { useLoading } from "./Loading";

type ButtonProps = React.ComponentProps<'button'> & {
    label?: string;
    icon?: ReactElement;
    color?: "primary" | "success" | "danger" | "warning" | "transparent";
    type?: "button" | "submit" | "reset";
    hasLoading?: boolean;
}

const ButtonComponent = styled.button<ButtonProps>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: ${(props) => colors[props.color || "primary"]};
    padding: 10px;
    border-radius: 5px;
    width: fit-content;
    min-height: 35px;
    border: none;
    color: ${(props) => (props.color === "transparent" ? "black" : "white")};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    font-size: ${font.textFontSize};

    &:focus {
        outline: none;
    }

    svg {
        color: white;
        font-size: 20px;
    }

    img {
        position: absolute;
        width: 30px;
    }
`;

export default function Button({ label, icon, color = "primary", type = "button", hasLoading = false, ...buttonProps }: ButtonProps) {
    const { loading } = useLoading();
    return (
        <ButtonComponent {...buttonProps}
            color={color}
            type={type}
            disabled={hasLoading && loading}>
            {icon && <span>{icon}</span>}
            {/*  {true &&
                <img src={process.env.PUBLIC_URL + '/loading.svg'} alt="loading" /> } */}
            {label}
        </ButtonComponent >
    )
}
