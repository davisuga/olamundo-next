import React, { useState } from "react";
import {
    Input,
    FormContainer,
    Title,
    SubmitButton,
} from "../../styles/pages/login";

function Form({ onSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [name, setName] = useState("");

    return (
        <FormContainer>
            <Title>Registre-se</Title>
            <Input
                onChange={({ target }) => setName(target.value)}
                value={name}
                placeholder="nome completo"
            />
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
            <Input
                onChange={({ target }) => setPasswordConfirmation(target.value)}
                value={passwordConfirmation}
                placeholder="confirme sua senha"
                type="password"
                required
            />
            <SubmitButton
                type="submit"
                onClick={(e) => onSubmit(email, name, password)}
            >
                Comece agora
            </SubmitButton>
        </FormContainer>
    );
}

export default Form;
