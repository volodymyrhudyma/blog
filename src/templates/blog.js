import React from "react"
import { graphql } from "gatsby"

import BackButton from "@components/BackButton"
import Layout from "@components/layout"
import AddComment from "@components/AddComment/AddComment"

export default function Template({ data }) {
  const { article, comments } = data
  const { frontmatter, html } = article
  return (
    <Layout>
      <BackButton fixed />
      <h1>{frontmatter.title}</h1>
      <span>{frontmatter.date}</span>
      <p dangerouslySetInnerHTML={{ __html: html }} />
      <BackButton text="All articles" />
      <AddComment />
      {comments.edges.map(({ node }) => (
        <div key={node.id}>
          {node.name} - {node.message} - {node.date}
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    article: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
    comments: allCommentsYaml(filter: { slug: { eq: "page-slug" } }) {
      edges {
        node {
          id
          name
          message
          date
        }
      }
    }
  }
`
