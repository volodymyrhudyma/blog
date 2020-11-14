import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import slugify from "slugify"

import BackButton from "@components/BackButton"
import Layout from "@components/Layout"
import AddComment from "@components/AddComment/AddComment"
import CommentList from "@components/CommentList/CommentList"
import SEO from "@components/seo"
import Sidebar from "@components/Sidebar"
import Newsletter from "@components/Newsletter"

import {
  TitleWrapper,
  Title,
  Date,
  BlackAngleDown,
  SidebarWrapper,
} from "./styles"

export default function Template({ data, path }) {
  const { article, comments } = data
  const { frontmatter } = article

  const [html, setHtml] = useState(article.html)
  const [headings, setHeadings] = useState([])
  const [showTOC, setShowTOC] = useState(false)

  useEffect(() => {
    const div = document.createElement("div")
    div.innerHTML = html
    const h2List = [...div.getElementsByTagName("h2")]
    let newHtml = html
    h2List.forEach(item => {
      const element = `<h2>${item.innerHTML}</h2>`
      const h2Start = newHtml.indexOf(element)
      const insertElement = `<div id='${slugify(item.innerHTML)}' />`
      newHtml = [
        newHtml.slice(0, h2Start),
        insertElement,
        newHtml.slice(h2Start),
      ].join("")
    })
    setHeadings(h2List)
    setHtml(newHtml)
  }, [])

  const toggleTOC = () => {
    setShowTOC(!showTOC)
  }

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.metaDescription}
      />

      <div style={{ display: "flex" }}>
        <div>
          <div style={{ marginTop: "2rem" }}>
            You are here:{" "}
            <Link style={{ marginRight: "0.25rem" }} to="/">
              Home
            </Link>
            <span style={{ marginRight: "0.25rem", display: "inline-block" }}>
              /
            </span>
            <span>{frontmatter.title}</span>
          </div>
          <TitleWrapper>
            <Title>{frontmatter.title}</Title>
            <Date>{frontmatter.date}</Date>
          </TitleWrapper>
          <h2
            style={{
              marginTop: 0,
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid rgb(205, 205, 205)",
              paddingBottom: "1.5rem",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={toggleTOC}
            onKeyPress={toggleTOC}
          >
            Table of contents
            <span
              style={{
                transform: showTOC ? "rotate(180deg)" : "rotate(0)",
                outline: "none",
              }}
            >
              <BlackAngleDown />
            </span>
          </h2>
          {showTOC && (
            <ul
              style={{
                borderBottom: "1px solid rgb(204, 204, 204)",
                margin: "0 0 1.5rem 0",
                paddingLeft: "1.5rem",
                paddingBottom: "0.725rem",
              }}
            >
              {headings.map((item, index) => (
                <li key={index}>
                  <a href={`#${slugify(item.innerHTML)}`}>{item.innerHTML}</a>
                </li>
              ))}
            </ul>
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <Newsletter wide />
          <BackButton text="All articles" />
          <AddComment slug={path} />
          <CommentList comments={comments} />
        </div>
        <SidebarWrapper marginTop>
          <Sidebar allPosts={data.allPosts.edges} />
        </SidebarWrapper>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    article: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        teaser
        date(formatString: "MMMM DD, YYYY")
        metaDescription
      }
      fields {
        slug
      }
    }
    comments: allCommentsYaml(filter: { slug: { eq: $path } }) {
      edges {
        node {
          id
          name
          message
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    allPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tag
            promote
          }
        }
      }
    }
  }
`
