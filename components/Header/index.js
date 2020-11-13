import React from "react";

import { Container } from "./styles";

export default function index(props) {
    return <Container>{props.children}</Container>;
}
