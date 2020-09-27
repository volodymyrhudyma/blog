import styled, { css } from "styled-components"

export const Content = styled.div`
  display: flex;
  padding: 0 2rem;

  ${({ addMarginTop }) =>
    addMarginTop
      ? css`
          margin: 5.5rem 0;
        `
      : css`
          margin: 2rem 0;
        `}
`

export const ArticleList = styled.div`
  width: calc(100% - 15rem);
  margin-right: 2rem;
`
