import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Button from "../components/Button";
import FormItem from "../components/FormItem";
import Input from "../components/Input";
import { useLoading } from "../components/Loading";
import { layout } from "../components/ui/Variables";
import TokenService from "../service/TokenService";

const LoginPageContainer = styled.div`
    margin: 0;
`;

const LoginPageContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${layout.lightGrey};
`;

const LoginPagePanel = styled.div`
    width: 460px;
    padding: 20px;
    background-color: ${layout.white};
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LoginPagePanelTitle = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    img {
        width: 380px;
    }
`;

const LoginPagePanelButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

`


export default function LoginPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e: any) => {
        setLoading(true);
        e.preventDefault();
        TokenService.doLogin(username, password)
            .then((response) => {
                localStorage.setItem('access_token', response.data);
                navigate('/');
            }).catch((error: any) => {
                console.error('Login failed:', error);
                toast.error(error.response.data.description);
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <LoginPageContainer>
            <ToastContainer />
            <LoginPageContent>
                <LoginPagePanel>
                    <LoginPagePanelTitle>
                        <img src="/logo-no-background-left-black.svg" alt="Logo"></img>
                    </LoginPagePanelTitle>
                    <form onSubmit={(e) => onLogin(e)}>
                        <FormItem>
                            <label>Username:</label>
                            <Input type="text" onChange={(value) => setUsername(value)} required></Input>
                        </FormItem>
                        <FormItem>
                            <label>Password:</label>
                            <Input type="password" onChange={(value) => setPassword(value)} required></Input>
                        </FormItem>
                        <LoginPagePanelButtons>
                            <Button label="Enter" type="submit" style={{ width: '100%', justifyContent: 'center' }} hasLoading></Button>
                            <a href="/login">Forgot your password?</a>
                        </LoginPagePanelButtons>
                    </form>
                </LoginPagePanel>
            </LoginPageContent>
        </LoginPageContainer>
    )
}