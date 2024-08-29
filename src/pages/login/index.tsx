import { ChangeEvent, useState } from "react";
import { Button, Col, Container, Form, Image, Row, Table } from 'react-bootstrap';
import InlineForm from '../../component/form/InlineForm.tsx';
import { LoginRequestForm } from "../../types/login/login.ts";
import LoginService from "../../api/login/LoginService.ts";
import { useNavigate } from "react-router";

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

        LoginService.login(requestForm).then(() => {
            navigate('/');
        })
    }

    return (
        <Container fluid>
            <div>login page</div>
            <InlineForm width={800}>
                <Form.Control type="text" value={id || ''} onChange={handleIdInput} />
            </InlineForm>
            <InlineForm width={800}>
                <Form.Control type="password" value={password || ''} onChange={handlePasswordInput} />
            </InlineForm>
            <Button type="button" variant="primary" onClick={handleSubmit}>로그인</Button>
        </Container>
        
    )
}
  
export default LoginPage