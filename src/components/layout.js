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

import social from "@utils/social.json"

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
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            width: 960,
            padding: "0 1rem",
            flex: "auto",
          }}
        >
          <main>{children}</main>
        </div>
        <footer
          style={{
            padding: "4.35rem 0",
            backgroundColor: "#fafafa",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              width: 960,
              padding: "0 1rem",
            }}
          >
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
              {social.map(({ name, link, icon }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`follow me on ${name}`}
                  style={{
                    display: "flex",
                    margin: "0 0.5rem",
                  }}
                >
                  <img width="24" src={icon} alt={name} style={{ margin: 0 }} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
