import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`

export const BlogTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

export const BlogDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

export const BlogDate = styled.div`
  font-size: 0.85rem;
  margin-right: 0.5rem;
`

export const BlogTag = styled.div`
  display: inline-block;
  font-size: 0.85rem;
  color: #1ca086;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`
