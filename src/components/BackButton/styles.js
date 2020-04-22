import styled, { css } from "styled-components"

export const Wrapper = styled.p`
  ${({ fixed }) =>
    fixed &&
    css`
      position: fixed;
      left: 1rem;
      top: 1rem;
    `}
`
