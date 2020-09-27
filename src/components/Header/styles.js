import styled, { css } from "styled-components"
import { Search } from "styled-icons/fa-solid"

export const Wrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #292929;
  height: 3.5rem;
  flex-shrink: 0;
  padding: 0 2rem;
  z-index: 9999;
`

export const Navigation = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const MenuList = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
`

export const MenuItem = styled.li`
  list-style: none;
  margin-bottom: 0;
  text-transform: uppercase;

  &:not(:last-child) {
    margin-right: 2rem;
  }

  a {
    position: relative;
    color: #fff;

    &:hover {
      &::after {
        opacity: 0.5;
      }
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -3px;
      height: 1px;
      background: #fff;
      opacity: 0;
      transition: opacity 0.15s ease;
    }
  }
`

export const IconList = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
`

export const IconItem = styled.li`
  list-style: none;
  margin-bottom: 0;
  width: 1.75rem;
  height: 1.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ noBg }) =>
    !noBg &&
    css`
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
    `}

  &:not(:last-child) {
    margin-right: 1rem;
  }

  svg {
    width: 1rem;
    height: 1rem;
    fill: #fff;
  }

  div {
    display: flex;
  }
`

export const StyledSearchIcon = styled(Search)`
  color: #fff;
`
