import { ChangeEvent, useState } from "react";
import { Button, Col, Container, Form, Image, Row, Table } from 'react-bootstrap';
import InlineForm from '../../component/form/InlineForm.tsx';
import { LoginRequestForm } from "../../types/login/login.ts";
import LoginService from "../../api/login/LoginService.ts";
import { useNavigate } from "react-router";
import styled from 'styled-components';

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    form {
        width: 24rem;
        max-width: 90%;
        z-index: 1;
        animation: showSignInForm 1s;
    }

    form img {
        width: 4rem;
    }
`;

function LoginPage() {
    
    const navigate = useNavigate();

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleIdInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setId(value);
    }

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setPassword(value);
    }

    const handleSubmit = () => {
        const requestForm = {
            username: id,
            password
        } as LoginRequestForm;

        if (!requestForm.username || !requestForm.password) {
            alert('아이디 또는 패스워드를 입력해주세요.');
            return;
        }

        LoginService.login(requestForm).then(() => {
            navigate('/');
        }).catch((reason) => {
            alert(reason?.response?.data?.message);
        })
    }

    return (
        <ContainerDiv>
            <Form className="shadow p-4 bg-white rounded">
                <Image src="/logo-black.png" alt="logo" style={{ width: '160px' }} />
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" value={id || ''} onChange={handleIdInput} />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>패스워드</Form.Label>
                    <Form.Control type="password" value={password || ''} onChange={handlePasswordInput} />
                </Form.Group>
                <Button style={{marginTop: 10}} type="button" variant="primary" onClick={handleSubmit}>로그인</Button>
            </Form>
      </ContainerDiv>
    )
}
  
export default LoginPage