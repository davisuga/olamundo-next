import React, { useEffect, useState } from "react";
import HeaderButton from "../../components/HeaderButton";
import Form from "../../components/RegisterForm";
import { Button } from "../../components/RegisterForm/styles";
import api from "../../services/axios";
import Header from "../../components/Header";
import { Container, Content, Presentation } from "./styles";

function Home() {
    const [logged, setLogged] = useState(false);
    const registerUser = async (email, name, password) => {
        try {
            const result = await api.post("progress", {
                user: { create: { email, password, name } },
            });
            localStorage.setItem("logged", "true");
            localStorage.setItem(
                "userdata",
                JSON.stringify({ email, password, name })
            );
            window.location = "/worlds";
            alert(result);
            setLogged(true);
        } catch (err) {
            alert("esse email já existe!");
        }
    };
    const goToWorlds = () => {
        window.location = "/worlds";
    };
    useEffect(() => {
        console.log("api singleton: ", api);
        const islogged = JSON.parse(localStorage.getItem("logged"));
        logged && goToWorlds();
    }, [logged]);

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
