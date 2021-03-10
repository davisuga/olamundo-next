import React, { useEffect, useState } from "react";
import HeaderButton from "../components/HeaderButton";
import Form from "../components/RegisterForm";
import { Button } from "../components/RegisterForm/styles";
import api from "../services/axios";
import Header from "../components/Header";
import { Container, Content, Presentation } from "../styles/pages/home";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

function Home() {
  const router = useRouter();
  const toast = useToast();
  const registerUser = async (email, name, password) => {
    try {
      await api.post("progress", {
        user: { create: { email, password, name } },
      });
      localStorage.setItem(
        "userdata",
        JSON.stringify({ email, password, name })
      );
      router.push("/worlds");
    } catch (err) {
      toast({
        title: "Esse email já foi cadastrado!",
        description: 'Clique no botão "login" para entrar na plataforma',
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
