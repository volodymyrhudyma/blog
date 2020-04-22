import React from "react"
import { Link, graphql } from "gatsby"

import BlogPostItem from "@components/BlogPostItem"
import Layout from "@components/layout"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const {
      pageContext: { currentPage, numPages },
    } = this.props
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1 ? "/blog" : `blog/${(currentPage - 1).toString()}`
    const nextPage = `/blog/${(currentPage + 1).toString()}`
    return (
      <Layout>
        <h1>Programming blog</h1>
        <span>Complicated stuff in simple words</span>
        {posts.map(({ node }) => (
          <BlogPostItem key={node.fields.slug} post={node} />
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2.175rem",
          }}
        >
          <div>
            {!isFirstPage && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
          </div>
          <div>
            {!isLastPage && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 256)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
