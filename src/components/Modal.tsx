import { IoClose } from "react-icons/io5";
import styled from "styled-components";

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode | React.ReactNode[];
    buttons?: React.ReactNode | React.ReactNode[];
}

const ModalComponent = styled.div`
    position: fixed;
    background: #0000004f;
    width: 100vw;
    min-height: 100%;
    top: 0;
    left: 0;
`

const ModalPanel = styled.div`
    position: fixed;
    top: 25vh;
    left: 25vw;
    background-color: white;
    box-shadow: 0px 1px 2px 0px #1018288a;
    padding: 20px;
    width: 50%;
    z-index: 9999;
    border-radius: 5px;
`

const ModalTitle = styled.div`
    font-size: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
        font-size: smaller;
    }
`

const ModalBody = styled.div`
    margin: 10px 0;
`

const ModalButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 20px;
    font-weight: normal;
    font-family: 'Roboto', sans-serif;
    color: black;
`

export default function Modal(props: ModalProps) {
    return (
        <>
            {props.isOpen && (
                <ModalComponent>
                    <ModalPanel>
                        <ModalTitle>
                            {props.title}
                            <IoClose onClick={() => props.onClose()}></IoClose>
                        </ModalTitle>
                        <hr />
                        <ModalBody>
                            {props.children}
                        </ModalBody>
                        <ModalButtons>
                            {props.buttons}
                        </ModalButtons>
                    </ModalPanel>
                </ModalComponent>
            )}
        </>
    )
}