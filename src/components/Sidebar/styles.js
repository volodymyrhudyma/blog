import { Link } from "gatsby"
import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  flex-shrink: 0;
  width: 17.5rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
  border-left: 1px solid #d6d6d6;
  height: 100%;
  padding: 0 1.5rem;

  @media (max-width: 1192px) {
    width: 15rem;
  }
`
export const Block = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  ${({ newsletter }) =>
    newsletter &&
    css`
      background: #fafafa;
      margin: 0 -1.5rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    `}
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

export const Item = styled(Link)`
  margin-bottom: 0.5rem;
  display: inline-block;
`
