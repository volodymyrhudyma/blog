import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const Wrapper = styled.div`
  display: flex;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`

export const BlogTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
  margin-right: 4rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
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

export const BlogTag = styled(Link)`
  display: inline-block;
  font-size: 0.85rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`

export const StyledLink = styled(Link)`
  color: #404040;
  transition: color 0.25s;

  &:hover {
    color: #1f7504;
  }
`

export const PostNumber = styled.div`
  position: absolute;
  right: 0;
  top: -1.25rem;
  font-size: 3rem;
  color: #d6d6d6;
  display: inline-block;
  text-shadow: 10px 10px #fafafa;

  @media (max-width: 768px) {
    display: none;
  }
`
