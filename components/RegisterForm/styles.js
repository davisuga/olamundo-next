import styled from "styled-components";

export const Input = styled.input`
    background: rgb(18, 18, 20);
    border-radius: 5px;
    height: 50px;
    margin: 5px;
    padding-left: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    color: #fff;
`;
export const Container = styled.div`
    background: rgb(32, 32, 36);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 64px;
    @media (max-width: 800px) {
        padding: 25px;
    }
    align-self: center;
    margin-right: 0px;
    width: 100%;
    max-width: 480px;
    box-sizing: border-box;
`;
export const Title = styled.h1`
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    /* identical to box height, or 79% */
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    color: #ab05f2;
`;

export const Button = styled.button`
    background: #ab05f2;
    border-radius: 10px;
    height: 74px;
    font-size: 25px;
    font-weight: bold;
    margin-top: 10px;
    &:hover {
        color: #ab05f2;
        background: rgb(18, 18, 20);
        border: 1px solid #ab05f2;
    }
    &:active {
        transform: scale(0.93);
    }
    transition: background 0.15s, color 0.15s, border 0.15s, transform 0.15s;
    cursor: pointer;
`;
