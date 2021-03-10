import React from "react";
import Header from "../components/Header";
import Form from "../components/LoginForm";
import api from "../services/axios";
import { Container, Content } from "../styles/pages/login";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

function Login() {
  const router = useRouter();
  const toast = useToast();
  const onSubmit = async (email, password) => {
    const theresEmailInDB = await api.get("user", { params: { email } });
    if (theresEmailInDB.data.length == 1) {
      router.push("/worlds");
    } else {
      toast({
        title: "Esse email não existe!",
        description: "Tente se cadastrar na plataforma primeiro.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
