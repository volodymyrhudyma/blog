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

  @media (max-width: 468px) {
    text-align: center;
  }
`

export const SidebarButton = styled.a`
  flex-shrink: 0;
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

  @media (max-width: 468px) {
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

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 2rem;
  margin-bottom: 0;
  flex-shrink: 0;
  object-fit: cover;

  @media (max-width: 992px) {
    margin-right: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 125px;
    height: 125px;
    margin-right: 1rem;
  }

  @media (max-width: 468px) {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`

export const SocialLink = styled.a`
  display: flex;
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
`
