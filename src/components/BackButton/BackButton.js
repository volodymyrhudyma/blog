import React from "react"
import { Link } from "gatsby"

import { Wrapper } from "./styles"

const BackButton = ({ text = "Back", fixed }) => (
  <Wrapper fixed={fixed}>
    <Link to="/blog">&#8592; {text}</Link>
  </Wrapper>
)

export default BackButton
