import React from "react"
import { Link } from "gatsby"

import social from "@utils/social.json"

import {
  Wrapper,
  WrapperInner,
  SidebarDescription,
  SidebarButton,
  SidebarSocial,
  BoldText,
  Block,
  Avatar,
  SocialLink,
  SocialImage,
} from "./styles"
import Container from "@components/Container"

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
              <Avatar src="https://i.ibb.co/V29JgcX/DSC-0024.jpg" />
            </Link>
            <SidebarDescription>
              I am <BoldText>Volodymyr Hudyma</BoldText>, Front-End Developer
            </SidebarDescription>
          </Block>
          <Block>
            <SidebarSocial>{renderSocialLinks()}</SidebarSocial>
            <SidebarButton href="https://www.vhudyma-portfolio.eu/">
              Get in touch
            </SidebarButton>
          </Block>
        </WrapperInner>
      </Container>
    </Wrapper>
  )
}

export default Header
