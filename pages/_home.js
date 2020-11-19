import React, { useEffect, useState } from "react";
import HeaderButton from "../components/HeaderButton";
import Form from "../components/RegisterForm";
import { Button } from "../components/RegisterForm/styles";
import api from "../services/axios";
import Header from "../components/Header";
import { Container, Content, Presentation } from "../styles/pages/home";
import { useAuth } from "../context/auth";

function Home() {
    const { setAuth } = useAuth();

    const registerUser = async (email, name, password) => {
        try {
            const result = await api.post("progress", {
                user: { create: { email, password, name } },
            });
            setAuth(true);
            localStorage.setItem(
                "userdata",
                JSON.stringify({ email, password, name })
            );
            setAuth(true)

            window.location = "/worlds";
        } catch (err) {
            alert("esse email já existe!");
        }
    };

    return (
        <div className="Home">
            <Header>
                <HeaderButton />
            </Header>
            <Container>
                <Content>
                    <Presentation />
                    <Form onSubmit={registerUser} />
                </Content>
            </Container>
        </div>
    );
}

export default Home;
