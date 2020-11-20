import React from "react";
import { Button, Container } from "./styles";

function BotaoMundo({ onClick, texto }) {
 
  return (
    <Container>
      <Button color="#D7F205" onClick={onClick}>
        {texto}
      </Button>
    </Container>
  );
}
export default BotaoMundo;
