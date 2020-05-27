import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const MainWrapper = styled.div`
  flex: auto;
  display: flex;
`

export const ContentWrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: auto;
  margin-left: 280px;
`

export const ContentChildren = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`

export const SidebarWrapper = styled.div`
  width: 280px;
  flex-shrink: 0;
  background-color: red;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  padding: 0 1rem;
`

export const Footer = styled.div`
  padding: 4.35rem 2rem;
  margin: 0 -2rem;
  background-color: #fafafa;
`

export const Avatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin-bottom: 0;
`

export const SidebarTitle = styled.h2`
  color: #fff;
`

export const SidebarDescription = styled.p`
  color: #fff;
`

export const SidebarImage = styled.div`
  margin-bottom: 1rem;
`

export const SidebarButton = styled.a`
  display: inline-block;
  background-color: transparent;
  border: 1px solid #fff;
  cursor: pointer;
  padding: 0.5rem 2rem;
  color: #fff;
  transition: all 0.5s;
  outline: none;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`

export const SidebarSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.45rem;
`

export const SocialLink = styled.a`
  display: flex;
  margin: 0 0.5rem;
`

export const SocialImage = styled.img`
  width: 24px;
  margin: 0;
`

export const BoldText = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
`

export const SidebarLink = styled.a`
  color: #fff;
  margin-bottom: 1.45rem;
  display: inline-block;
  text-decoration: underline;
`
