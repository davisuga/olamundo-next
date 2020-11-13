import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: rgb(18, 18, 20);
  justify-content: center;
`;
export const LeftSide = styled.div`
  flex-grow: 1;
  background-color: #000;
`;
export const Content = styled.div`
  flex-grow: 1;
  background: rgb(18, 18, 20);

  max-width: 50vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 1 0%;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  padding: 32px;
  @media (max-width: 800px) {
    flex-direction: column;
    position: relative;
  }
`;
