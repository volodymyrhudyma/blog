import styled, { css } from "styled-components"
import { AngleDown } from "styled-icons/fa-solid"
import { Link } from "gatsby"

export const Wrapper = styled.div`
  cursor: pointer;
  font-weight: 600;
  outline: none;
`

export const WrapperOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const BlackAngleDown = styled(AngleDown)`
  color: #404040;
  width: 14px;
`

export const TOCTag = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
`

export const TOCLink = styled.div`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #d6d6d6;
`

export const TOCSectionList = styled.ul`
  margin: 0;
`

export const TOCSectionListItem = styled.li`
  list-style: none;
  flex: 1;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;

  ${({ addBorder }) =>
    addBorder &&
    css`
      border-bottom: 1px solid #d6d6d6;
    `}
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

export const BlogDate = styled.span`
  font-size: 0.75rem;
  color: #989898;
`

export const SearchWrapper = styled.div`
  position: relative;

  @media (max-width: 480px) {
    width: 100%;
  }
`
