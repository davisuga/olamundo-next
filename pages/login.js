import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../components/Header";
import { Button } from "../components/HeaderButton/styles";
import { useAuth } from "../context/auth";
import api from "../services/axios";
import { Container, Content } from "../styles/pages/login";
import {
    Input,
    FormContainer,
    Title,
    SubmitButton,
} from "../styles/pages/login";

function Login() {
    const { setAuth } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (email, password) => {
        try {
            const theresEmailInDB = await api.get("/user", {
                params: { email },
            });
            console.log("theresEmailInDB? ", theresEmailInDB.data);
            if (theresEmailInDB.data.length == 1) {
                router.push("/worlds");
            } else {
                alert("esse email não existe!");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="Login">
            <Header />
            <Container>
                <Content>
                    <FormContainer>
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
                        <SubmitButton
                            onClick={}
                        >
                            ENTRAR
                        </SubmitButton>
                    </FormContainer>
                </Content>
            </Container>
        </div>
    );
}

export default Login;
