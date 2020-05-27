import React from "react"
import { Link, graphql } from "gatsby"

import BlogPostItem from "@components/BlogPostItem"
import Layout from "@components/Layout"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const {
      pageContext: { currentPage, numPages },
    } = this.props
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1 ? "/" : `/${(currentPage - 1).toString()}`
    const nextPage = `/${(currentPage + 1).toString()}`
    return (
      <Layout>
        <div
          style={{
            padding: "0 2rem 0.725rem 2rem",
            margin: "0 -2rem",
            backgroundColor: "#fafafa",
            textAlign: "center",
          }}
        >
          <h1>Complicated stuff in simple words</h1>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {posts.map(({ node }) => (
            <BlogPostItem key={node.fields.slug} post={node} />
          ))}
        </div>
        {numPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
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
        )}
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
