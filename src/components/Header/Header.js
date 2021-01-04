import React from "react"
import { Link } from "gatsby"

import Container from "@components/Container"

import social from "@utils/social.json"

import {
  Wrapper,
  WrapperInner,
  SidebarDescription,
  SidebarButton,
  AboutMeLink,
  SidebarSocial,
  BoldText,
  Block,
  BlockInner,
  Avatar,
  SocialLink,
  SocialImage,
} from "./styles"

const Header = () => {
  const renderSocialLinks = () =>
    social.map(({ name, link, icon }) => (
      <SocialLink
        key={name}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`follow me on ${name}`}
      >
        <SocialImage src={icon} alt={name} />
      </SocialLink>
    ))

  return (
    <Wrapper>
      <Container>
        <WrapperInner>
          <Block>
            <Link to="/">
              <Avatar />
            </Link>
            <SidebarDescription>
              I am
              <br /> Volodymyr Hudyma
              <BoldText>{"<FrontEndDeveloper />"}</BoldText>
            </SidebarDescription>
          </Block>
          <Block>
            <BlockInner>
              <SidebarButton href="https://www.vhudyma-portfolio.eu/">
                Get in touch
              </SidebarButton>
              <AboutMeLink to='/2020-05-01-a-few-words-about-author'>About me</AboutMeLink>
            </BlockInner>
            <SidebarSocial>{renderSocialLinks()}</SidebarSocial>
          </Block>
        </WrapperInner>
      </Container>
    </Wrapper>
  )
}

export default Header
