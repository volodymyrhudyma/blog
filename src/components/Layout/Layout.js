/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components"

import Newsletter from "@components/Newsletter"

import { Content, ArticleList } from "./styles"

import Header from "../Header"
import Hero from "../Hero"
import SideBar from "../SideBar"

const GlobalStyle = createGlobalStyle`
  html {
    @media (max-width: 768px) {
      font-size: 106.25%;
    }
  }

  a {
    color: #187d38;
  }

  pre[class*="language-"] {
    margin-top: 0;
    margin-bottom: 1.45rem;
    overflow-x: auto;
  }

  code[class*="language-"] {
    font-size: 0.75rem;
    white-space: pre-wrap;

    @media (max-width: 768px) {
      word-break: break-all;
    }
  }

  :not(pre) > code[class*="language-"] {
    padding: 0.1rem 0.25rem;
  }
`

const Layout = ({ children, hideHero }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      {!hideHero && <Hero />}
      <Content addMarginTop={hideHero}>
        <ArticleList>
          {children}
          <Newsletter
            title="Subscribe to the newsletter"
            subtitle="Receive all new posts directly to your e-mail. No spam, I promise."
          />
        </ArticleList>
        <SideBar />
      </Content>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
