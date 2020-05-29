import React from "react"
import { Link, graphql } from "gatsby"

import BlogPostItem from "@components/BlogPostItem"
import Layout from "@components/Layout"
import SEO from "@components/seo"

import { PaginationWrapper, PageInfo } from "./styles"

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
        <SEO title="Articles" />
        <div
          style={{
            padding: "0 2rem 0.725rem 2rem",
            margin: "0 -2rem",
            backgroundColor: "#fafafa",
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
          <PaginationWrapper>
            <div
              style={{
                visibility: !isFirstPage ? "visible" : "hidden",
              }}
            >
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            </div>
            <PageInfo>
              Page {currentPage} of{" "}
              <Link to={numPages} rel="prev">
                {numPages}
              </Link>
            </PageInfo>
            <div
              style={{
                visibility: !isLastPage ? "visible" : "hidden",
              }}
            >
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            </div>
          </PaginationWrapper>
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
          fields {
            slug
          }
          frontmatter {
            title
            teaser
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
