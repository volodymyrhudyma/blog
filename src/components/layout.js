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

import Header from "./header"

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    display: flex;
    height: 100%;
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
      <div
        style={{
          margin: "0 auto",
          width: 960,
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            margin: "4.35rem 0",
          }}
        >
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://vhudyma.netlify.com/">Volodymyr Hudyma</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
