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
      <h1>{frontmatter.title}</h1>
      <span>{frontmatter.date}</span>
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
