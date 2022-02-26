import { Link } from "gatsby"
import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  background-color: #fafafa;
  padding-bottom: 2rem;
`
export const Banner = styled.div`
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

export const BannerTop = styled.div`
  flex: 1;
  background-color: #0057b7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`

export const BannerBottom = styled.div`
  flex: 1;
  background-color: #ffd700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 2rem;
`

export const DonateLink = styled.a`
  display: inline-block;
  margin-left: 0.5rem;
  font-weight: bold;
  text-decoration: underline;
`

export const BannerHeading = styled.div`
  font-size: 2rem;
  text-align: center;
  padding: 0 2rem;
  line-height: 2rem;
`

export const BannerDescription = styled.div`
  margin-bottom: 2rem;
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

export const AboutMeLink = styled(Link)`
  flex-shrink: 0;
  display: inline-block;
  background-color: transparent;
  border: 1px solid #404040;
  color: #000;
  cursor: pointer;
  padding: 0.5rem 2rem;
  transition: background-color 0.5s;
  outline: none;
  margin-left: 0.75rem;

  @media (max-width: 468px) {
    width: 100%;
    text-align: center;
    margin-left: 0;
    margin-bottom: 0.75rem;
  }

  &:hover {
    background-color: #404040;
    color: #fff;
  }
`

export const SidebarSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
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
    flex-direction: column;
  }
`

export const BlockInner = styled.div`
  @media (max-width: 468px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
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
  &:not(:last-child) {
    margin: 0 0.75rem;
  }

  &:last-child {
    margin-left: 0.75rem;
  }
`

export const SocialImage = styled.img`
  width: 30px;
  min-width: 30px;
  margin-bottom: 0;
  display: flex;
`
