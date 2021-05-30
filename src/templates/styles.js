import styled, { css } from "styled-components"

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
  }
`

export const PageInfo = styled.div`
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

export const TitleWrapper = styled.div`
  margin: 3rem 0;
`

export const Title = styled.h1`
  margin: 0 0 0.5rem 0;
`

export const Date = styled.div`
  font-size: 0.85rem;
  display: inline-block;
  color: #757575;
`

export const SubTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`

export const BlogListContent = styled.div`
  display: flex;
  margin-top: 2rem;
`

export const SidebarWrapper = styled.div`
  height: 100%;

  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: 2rem;
    `}

  @media (max-width: 992px) {
    display: none;
  }
`

export const Content = styled.div`
  h2 {
    code {
      font-size: 1.4rem !important;
    }
  }

  ${({ halfImageWidth }) =>
    halfImageWidth &&
    css`
      img {
        max-width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
    `}
`
