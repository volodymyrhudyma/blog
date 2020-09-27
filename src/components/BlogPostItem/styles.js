import styled from "styled-components"

export const Wrapper = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e7e7e7;
`

export const BlogTitle = styled.h2`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
  margin-right: 2rem;
`

export const BlogDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`

export const BlogDate = styled.div`
  font-size: 0.85rem;
  margin-right: 0.75rem;
`

export const BlogTag = styled.div`
  display: inline-block;
  font-size: 0.85rem;
  color: #187d38;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`
