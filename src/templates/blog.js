import React from "react"
import { graphql } from "gatsby"

import BackButton from "@components/BackButton"
import Layout from "@components/layout"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <BackButton fixed />
      <h1>{frontmatter.title}</h1>
      <span>{frontmatter.date}</span>
      <p dangerouslySetInnerHTML={{ __html: html }} />
      <BackButton text="All articles" />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
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
  }
`
