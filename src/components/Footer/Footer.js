import React from "react"

import Container from "@components/Container"

import { Wrapper } from "./styles"

const Footer = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
)

export default Footer
