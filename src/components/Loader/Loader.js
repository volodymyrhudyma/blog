import React from "react"

import { Wrapper } from "./styles"

const Loader = () => (
  <Wrapper>
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </Wrapper>
)

export default Loader
