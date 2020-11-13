import styled from "styled-components"

export const Wrapper = styled.div`
  background-color: #fafafa;
  padding: 2rem 0;
`

export const WrapperInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SidebarDescription = styled.div``

export const SidebarButton = styled.a`
  display: inline-block;
  background-color: #000;
  border: 1px solid #000;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 2rem;
  transition: background-color 0.5s;
  outline: none;

  &:hover {
    background-color: transparent;
    color: #000;
  }
`

export const SidebarSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BoldText = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
`

export const Block = styled.div`
  display: flex;
  align-items: center;
`

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 2rem;
  margin-bottom: 0;
`

export const SocialLink = styled.a`
  display: flex;
  margin: 0 0.75rem;

  &:last-child {
    margin-right: 1.5rem;
  }
`

export const SocialImage = styled.img`
  width: 24px;
  margin-bottom: 0;
`
