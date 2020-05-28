/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"
import { useCookies } from "react-cookie"
import debounce from "lodash/debounce"

import social from "@utils/social.json"

import {
  Wrapper,
  MainWrapper,
  SidebarWrapper,
  ContentWrapper,
  ContentChildren,
  Footer,
  Avatar,
  SidebarTitle,
  SidebarDescription,
  SidebarImage,
  SidebarButton,
  SidebarSocial,
  SocialLink,
  SocialImage,
  BoldText,
  SidebarLink,
  SidebarClose,
  SidebarShowFull,
} from "./styles"

import Header from "../header"

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    display: flex;
    height: 100%;
    overflow-x: hidden;
  }

  #___gatsby {
    width: 100%;
  }

  #gatsby-focus-wrapper {
    display: flex;
    height: 100%;
  }

  main {
    flex: auto;
  }

  pre[class*="language-"] {
    margin-top: 0;
    margin-bottom: 1.45rem;
  }

  code[class*="language-"] {
    font-size: 0.75rem;
    white-space: pre-wrap;
  }

  :not(pre) > code[class*="language-"] {
    padding: 0.1rem 0.25rem;
  }
`

const Layout = ({ children }) => {
  const [sidebarMini, setSidebarMini] = useState(false)
  const [cookies, setCookie] = useCookies(["hideSidebar"])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleResize = debounce(() => {
    const windowWidth = window.innerWidth
    if (windowWidth <= 1200) {
      setSidebarMini(true)
    } else {
      setSidebarMini(false)
    }
  }, 50)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const renderSocialLinks = (color = "default") =>
    social.map(({ name, link, icon, iconWhite }) => (
      <SocialLink
        key={name}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`follow me on ${name}`}
      >
        <SocialImage src={color === "white" ? iconWhite : icon} alt={name} />
      </SocialLink>
    ))

  const handleClose = () => {
    // 24 hours from now
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + 1 * 3600 * 1000 * 24)
    setCookie("hideSidebar", true, { path: "/", expires: expirationDate })
  }

  const toggleMini = () => {
    setSidebarMini(!sidebarMini)
  }

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Wrapper>
        <MainWrapper>
          {!cookies.hideSidebar && (
            <SidebarWrapper mini={sidebarMini}>
              {sidebarMini ? (
                <SidebarShowFull onClick={toggleMini}>
                  <span></span>
                  <span></span>
                  <span></span>
                </SidebarShowFull>
              ) : (
                <>
                  <SidebarClose onClick={toggleMini}>
                    <span></span>
                    <span></span>
                  </SidebarClose>
                  <SidebarTitle>Hello,</SidebarTitle>
                  <SidebarImage>
                    <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQHB3M-_Sj7VJQ/profile-displayphoto-shrink_400_400/0?e=1596067200&v=beta&t=IjzCHvrKqJ9NsOtLQRxTXQ2m9lgsTpTV4TfzEH_x5ZY" />
                  </SidebarImage>
                  <SidebarDescription>
                    I am Volodymyr Hudyma{" "}
                    <BoldText>Front-end developer</BoldText> with more than{" "}
                    <BoldText>5 years of experience</BoldText> in software
                    development <br />
                  </SidebarDescription>
                  <SidebarLink href="/2020-05-01-a-few-words-about-author/">
                    About me
                  </SidebarLink>
                  <SidebarSocial>{renderSocialLinks("white")}</SidebarSocial>
                  <SidebarButton href="https://vhudyma.netlify.com/">
                    Get in touch
                  </SidebarButton>
                </>
              )}
            </SidebarWrapper>
          )}
          <ContentWrapper
            miniMargin={sidebarMini}
            noMargin={cookies.hideSidebar}
          >
            <ContentChildren>{children}</ContentChildren>
            <Footer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <div>© {new Date().getFullYear()}</div>
                <div>
                  by
                  {` `}
                  <a href="https://vhudyma.netlify.com/">Volodymyr Hudyma</a>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {renderSocialLinks()}
              </div>
            </Footer>
          </ContentWrapper>
        </MainWrapper>
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
