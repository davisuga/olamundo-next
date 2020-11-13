import React from "react";
import { Button, Container } from "./styles";
//Nao esqueça de ↑↑↑↑↑↑↑↑↑ importar quando usar ;)
function BotaoMundo({ onClick, texto }) {
  //      recebemos  onClick e texto
  return (
    <Container>
      <Button color="#D7F205" onClick={onClick}>
        {texto}
      </Button>
    </Container>
  );
}
export default BotaoMundo;
