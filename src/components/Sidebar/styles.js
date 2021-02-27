import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { Hot } from "@styled-icons/boxicons-solid"
import { Link as LinkIcon } from "@styled-icons/boxicons-regular"
import { Hash } from "@styled-icons/evaicons-solid/Hash"
import { ReactLogo, Javascript } from "@styled-icons/boxicons-logos"
import { Lightbulb } from "@styled-icons/foundation"

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
  background: #fafafa;
  margin: 0 -1.5rem;
  padding: 1.5rem;

  ${({ green }) =>
    green &&
    css`
      background: #1f75041c;
    `}

  ${({ black }) =>
    black &&
    css`
      background: #404040;
      color: #fff;
    `}

  ${({ react }) =>
    react &&
    css`
      background: rgba(97, 219, 251, 0.2);
    `}

  ${({ javascript }) =>
    javascript &&
    css`
      background: rgba(240, 219, 79, 0.2);
    `}

    ${({ git }) =>
      git &&
      css`
        background: rgba(241, 80, 47, 0.2);
      `}

  ${({ popular }) =>
    popular &&
    css`
      background: rgba(255, 165, 0, 0.2);
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

export const HashIconStyled = styled(Hash)`
  color: #404040;
  width: 30px;
  margin-right: 0.5rem;
`

export const JavascriptIcon = styled(Javascript)`
  color: #f0db4f;
  width: 30px;
  margin-right: 0.5rem;
`

export const OtherIcon = styled(Lightbulb)`
  width: 30px;
  margin-right: 0.5rem;
  position: relative;
  top: -4px;
`

export const Text = styled.div``
