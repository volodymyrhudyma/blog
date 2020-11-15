import React from "react"
import styled from "styled-components"
import { Search } from "styled-icons/fa-solid"
import { Algolia } from "styled-icons/fa-brands"

export const Root = styled.div``

export const SearchIcon = styled(Search)`
  width: 1rem;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0 0.5rem 1.5rem;
  border: 0;
  border-bottom: 1px solid #d6d6d6;
  background-color: transparent;
  outline: none;
`

export const Form = styled.form`
  position: relative;
  margin: 0;
  min-width: 17.5rem;

  @media (max-width: 1192px) {
    min-width: 15rem;
  }

  @media (max-width: 992px) {
    min-width: 12.5rem;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const HitsWrapper = styled.div`
  position: absolute;
  background-color: #fff;
  z-index: 1;
  padding: 1rem;
  max-height: 16rem;
  overflow-y: auto;
  box-sizing: content-box;
  border-left: 1px solid #d6d6d6;
  border-right: 1px solid #d6d6d6;
  border-bottom: 1px solid #d6d6d6;
  margin: 0 -1px -1px -1px;

  a {
    color: #404040;
    transition: color 0.25s;

    &:hover {
      color: #1f7504;
    }
  }

  ul {
    margin: 0;

    li {
      margin: 0;
      list-style: none;
      margin-bottom: 1rem;
    }
  }
`

export const PoweredBy = () => (
  <span css="font-size: 0.6em; text-align: end; padding: 0;">
    Powered by{` `}
    <a href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
)
