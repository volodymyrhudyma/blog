import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  height: 100%;
`

export const SideBarBox = styled.div`
  width: 15rem;
  flex-shrink: 0;

  ${({ noPadding }) =>
    !noPadding &&
    css`
      padding: 1rem;
      border: 1px solid #e7e7e7;
    `}

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

export const Heading = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  text-transform: uppercase;
`

export const ArticleList = styled.ul`
  padding: 0;
  margin: 0;
`

export const ArticleItem = styled.li`
  list-style: none;
  margin-bottom: 0;

  &:not(:last-child) {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #e7e7e7;
  }
`

export const Text = styled.div`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`
