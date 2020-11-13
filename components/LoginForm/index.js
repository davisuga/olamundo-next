import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import { Input, Container, Title, Button } from "../RegisterForm/styles";
function Form({ onSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth, setAuth } = useAuth();
    return (
        <Container>
            <Title>Login</Title>
            <Input
                onChange={({ target }) => setEmail(target.value)}
                value={email}
                placeholder="email"
            ></Input>

            <Input
                onChange={({ target }) => setPassword(target.value)}
                value={password}
                placeholder="senha"
                type="password"
            />
            <Button onClick={() => onSubmit(email, password)}>Entrar</Button>
        </Container>
    );
}

export default Form;
