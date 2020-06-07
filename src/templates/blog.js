import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"

import BackButton from "@components/BackButton"
import Layout from "@components/Layout"
import AddComment from "@components/AddComment/AddComment"
import CommentList from "@components/CommentList/CommentList"
import SEO from "@components/seo"

export default function Template({ data, path }) {
  const { article, comments } = data
  const { frontmatter, html } = article

  const [headings, setHeadings] = useState([])
  const [showTOC, setShowTOC] = useState(true)

  useEffect(() => {
    const regex = /<h2>(.*)<\/h2>/g
    const result = html.match(regex)
    setHeadings(result)
  }, [html])

  const toggleTOC = () => {
    setShowTOC(!showTOC)
  }

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.teaser} />
      <div
        style={{
          padding: "0 2rem 0.725rem 2rem",
          margin: "0 -2rem 2rem -2rem",
          backgroundColor: "#fafafa",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem" }}>{frontmatter.title}</h1>
        <span
          style={{
            fontSize: "0.85rem",
            display: "inline-block",
            marginBottom: "1.45rem",
          }}
        >
          {frontmatter.date}
        </span>
        <div style={{ marginBottom: "1.45rem" }}>
          You are here:{" "}
          <Link style={{ marginRight: "0.25rem" }} to="/">
            Home
          </Link>
          <span style={{ marginRight: "0.25rem", display: "inline-block" }}>
            /
          </span>
          <span>{frontmatter.title}</span>
        </div>
      </div>
      <h2
        style={{
          marginTop: 0,
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(204, 204, 204)",
          paddingBottom: "1.45rem",
          cursor: "pointer",
          outline: "none",
        }}
        onClick={toggleTOC}
        onKeyPress={toggleTOC}
      >
        Table of contents
        <span
          style={{
            transform: showTOC ? "rotate(90deg)" : "rotate(-90deg)",
            outline: "none",
          }}
        >
          &#60;
        </span>
      </h2>
      {showTOC && (
        <ul
          style={{
            borderBottom: "1px solid rgb(204, 204, 204)",
            margin: "0 0 1.45rem 0",
            paddingLeft: "1.45rem",
            paddingBottom: "0.725rem",
          }}
        >
          {headings.map((item, index) => (
            <li key={index}>{item.replace(/<\/?h2>/g, "")}</li>
          ))}
        </ul>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <BackButton text="All articles" />
      <AddComment slug={path} />
      <CommentList comments={comments} />
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
  }
`
