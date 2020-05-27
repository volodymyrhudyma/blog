import React from "react"
import { graphql } from "gatsby"

import BackButton from "@components/BackButton"
import Layout from "@components/Layout"
import AddComment from "@components/AddComment/AddComment"
import CommentList from "@components/CommentList/CommentList"

export default function Template({ data, path }) {
  const { article, comments } = data
  const { frontmatter, html } = article
  return (
    <Layout>
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
          <a style={{ marginRight: "0.25rem" }} href="/">
            Home
          </a>
          ->
          <span style={{ display: "inline-block", marginLeft: "0.25rem" }}>
            {frontmatter.title}
          </span>
        </div>
      </div>
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
