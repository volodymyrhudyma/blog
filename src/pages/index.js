import React from "react"

import BlogPostItem from "@components/BlogPostItem"
import Layout from "@components/layout"
import SEO from "@components/seo"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <SEO title="Home" />
    {edges.map(edge => (
      <BlogPostItem key={edge.node.id} post={edge.node} />
    ))}
  </Layout>
)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default IndexPage
