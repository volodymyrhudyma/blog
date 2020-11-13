/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import Header from "@components/Header"
import Container from "@components/Container"
import Footer from "@components/Footer"

const GlobalStyle = createGlobalStyle`
  html {

    @media (max-width: 768px) {
      font-size: 106.25%;
    }
  }

  body {
    overflow-x: hidden;
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

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>{children}</Container>
      <Footer>Footer</Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
