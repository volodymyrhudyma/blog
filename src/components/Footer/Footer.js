import React from "react"

import Container from "@components/Container"

import { Wrapper } from "./styles"

const Footer = () => (
  <Wrapper>
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <div>© {new Date().getFullYear()}</div>
        <a href="https://www.vhudyma-portfolio.eu/">by Volodymyr Hudyma</a>
      </div>
    </Container>
  </Wrapper>
)

export default Footer
