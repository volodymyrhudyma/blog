import styled from "styled-components"

export const Wrapper = styled.div`
  background-color: #fafafa;
  padding: 2rem 0;
`

export const WrapperInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`

export const SidebarDescription = styled.div`
  font-size: 1.125rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`

export const SidebarButton = styled.a`
  flex-shrink: 0;
  display: inline-block;
  background-color: #404040;
  border: 1px solid #404040;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 2rem;
  transition: background-color 0.5s;
  outline: none;

  &:hover {
    background-color: transparent;
    color: #404040;
  }
`

export const SidebarSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;

  @media (max-width: 1192px) {
    margin-left: 0;
  }

  @media (max-width: 992px) {
    margin-bottom: 1.5rem;
  }
`

export const BoldText = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`

export const Block = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 992px) {
    margin-bottom: 1.5rem;
  }

  &:last-child {
    flex-direction: row;

    @media (max-width: 992px) {
      flex-direction: column;
      margin-bottom: 0;
    }
  }
`

export const Avatar = styled.div`
  background-image: url("/avatar.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 2rem;
  margin-bottom: 0;
  flex-shrink: 0;

  @media (max-width: 992px) {
    margin-right: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 175px;
    margin-right: 0;
    margin-bottom: 0.5rem;
    background-size: contain;
    border-radius: 0;
  }
`

export const SocialLink = styled.a`
  margin: 0 0.75rem;

  &:last-child {
    margin-right: 1.5rem;

    @media (max-width: 992px) {
      margin-right: 0.75rem;
    }
  }
`

export const SocialImage = styled.img`
  width: 24px;
  min-width: 24px;
  margin-bottom: 0;
  display: flex;
`
