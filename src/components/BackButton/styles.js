import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  margin-bottom: 1.45rem;
  ${({ fixed }) =>
    fixed
      ? css`
          position: fixed;
          left: 1rem;
          top: 1rem;
        `
      : css`
          border-top: 1px solid lightgray;
          padding-top: 1.45rem;
        `}
`
