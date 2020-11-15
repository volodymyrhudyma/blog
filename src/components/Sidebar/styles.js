import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { Hot } from "@styled-icons/boxicons-solid"
import { Link as LinkIcon } from "@styled-icons/boxicons-regular"
import { ReactLogo, Javascript } from "@styled-icons/boxicons-logos"

export const Wrapper = styled.div`
  flex-shrink: 0;
  width: 17.5rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
  border-left: 1px solid #d6d6d6;
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
  display: flex;
  align-items: center;
`

export const Item = styled(Link)`
  margin-bottom: 0.5rem;
  display: block;
  color: #404040;
  transition: color 0.25s;

  &:not(:last-child) {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #d6d6d6;
  }

  &:hover {
    color: #1f7504;

    svg {
      color: #1f7504;
    }
  }
`

export const RedHot = styled(Hot)`
  color: orange;
  width: 30px;
  margin-right: 0.5rem;
`

export const ReactIcon = styled(ReactLogo)`
  color: #61dbfb;
  width: 30px;
  margin-right: 0.5rem;
`

export const LinkIconStyled = styled(LinkIcon)`
  color: #404040;
  width: 20px;
  margin-right: 0.5rem;
  transition: color 0.25s;
`

export const JavascriptIcon = styled(Javascript)`
  color: #f0db4f;
  width: 30px;
  margin-right: 0.5rem;
`

export const Text = styled.div``
