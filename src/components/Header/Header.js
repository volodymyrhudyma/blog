import React from "react"
import { Link } from "gatsby"

import Container from "@components/Container"

import social from "@utils/social.json"

import {
  Wrapper,
  Banner,
  BannerTop,
  BannerBottom,
  BannerHeading,
  BannerDescription,
  DonateLink,
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
      <Banner>
        <BannerTop>
          <BannerHeading>Support People In Ukraine</BannerHeading>
        </BannerTop>
        <BannerBottom>
          <DonateLink href="https://savelife.in.ua/en/donate/" target="__blank">
            DONATE HERE
          </DonateLink>
        </BannerBottom>
      </Banner>
      <Container>
        <BannerDescription>
          Ukraine was invaded by Russia in the early morning of 24.02.2022,
          explosions thundered in Ukrainian cities, many civilians died, tens of
          millions are affected. Our army protects all Europe from the occupiers
          and it needs help now to restrain one of the biggest armies in the
          world. Plese, donate a small amount.
        </BannerDescription>
        <WrapperInner>
          <Block>
            <Link to="/">
              <Avatar />
            </Link>
            <SidebarDescription>
              I Am
              <br /> Volodymyr Hudyma
              <BoldText>{"<FrontEndDeveloper />"}</BoldText>
            </SidebarDescription>
          </Block>
          <Block>
            <BlockInner>
              <SidebarButton href="https://www.linkedin.com/in/volodymyr-hudyma-98bb78131/">
                Get In Touch
              </SidebarButton>
              <AboutMeLink to="/2020-05-01-a-few-words-about-author">
                About Me
              </AboutMeLink>
            </BlockInner>
            <SidebarSocial>{renderSocialLinks()}</SidebarSocial>
          </Block>
        </WrapperInner>
      </Container>
    </Wrapper>
  )
}

export default Header
