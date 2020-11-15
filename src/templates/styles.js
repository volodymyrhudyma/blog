import { AngleDown } from "styled-icons/fa-solid"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { Link as LinkIcon } from "@styled-icons/boxicons-regular"

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
`

export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const SearchWrapper = styled.div`
  position: relative;

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const TOCWrapper = styled.div`
  cursor: pointer;
  font-weight: 600;
  outline: none;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`

export const TOCTag = styled.div`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
`

export const TOCLink = styled.div`
  margin-bottom: 0.5rem;
`

export const TOCSectionList = styled.ul`
  margin: 0;
  display: flex;

  @media (max-width: 992px) {
    display: block;
  }
`

export const TOCSectionListItem = styled.li`
  list-style: none;
  flex: 1;

  &:not(:last-child) {
    margin-right: 2rem;

    @media (max-width: 992px) {
      margin-right: 0;
    }
  }
`

export const BlackAngleDown = styled(AngleDown)`
  color: #404040;
  width: 14px;
`

export const BlogListContent = styled.div`
  display: flex;
  margin-top: 2.5rem;
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

export const StyledLink = styled(Link)`
  color: #404040;
  transition: color 0.25s;

  &:hover {
    color: #1f7504;

    svg {
      color: #1f7504;
    }
  }
`

export const LinkIconStyled = styled(LinkIcon)`
  color: #404040;
  width: 20px;
  margin-right: 0.5rem;
  transition: color 0.25s;
`
