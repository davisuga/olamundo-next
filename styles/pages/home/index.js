import styled from "styled-components";
import React from "react";
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


const PresentationTitle = styled.h1`
    color: #ab05f2;
    font-size: 100px;
    line-height: 100px;
`;
const PresentationContainer = styled.div`
    max-width: 480px;
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 29px;
    margin: 0px 10px 50px 0px;
    /* or 167% */

    color: rgb(225, 225, 230);
`;

export const Presentation = () => {
    return (
        <PresentationContainer>
            <PresentationTitle>Olá Mundo</PresentationTitle>A equipe do olámundo
            entende o quão é importante o conhecimento básico de programação e o
            quão díficil é encontrar materiais em português para estudar, para
            isso criamos uma plataforma para te ensinar o básico.
        </PresentationContainer>
    );
};
