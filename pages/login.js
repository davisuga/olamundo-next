import React from "react";
import Header from "../components/Header";
import Form from "../components/LoginForm";
import api from "../services/axios";
import { Container, Content } from "../styles/pages/login";

function Login() {
    
    const onSubmit = async (email, password) => {
        const theresEmailInDB = await api.get("user", { params: { email } });
        alert(JSON.stringify(theresEmailInDB.data.length));
        if (theresEmailInDB.data.length == 1) {
            window.location = "worlds";
        } else {
            alert("esse email não existe!");
        }
    };
    return (
        <div className="Login">
            <Header />
            <Container>
                <Content>
                    <Form onSubmit={onSubmit} />
                </Content>
            </Container>
        </div>
    );
}

export default Login;
