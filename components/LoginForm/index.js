import React, { useState } from "react";
import { Input, FormContainer, Title, Button } from "../../styles/pages/login/styles";
function Form({ onSubmit }) {
  
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
            <Button type="submit" onClick={() => onSubmit(email, password)}>
                Entrar
            </Button>
        </Container>
    );
}

export default Form;
