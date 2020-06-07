import React from "react"
import { Link, graphql } from "gatsby"

import BlogPostItem from "@components/BlogPostItem"
import Layout from "@components/Layout"
import SEO from "@components/seo"
import Search from "@components/Search"

import {
  PaginationWrapper,
  PageInfo,
  SubTitle,
  SearchWrapper,
  TOCWrapper,
} from "./styles"

const searchIndices = [
  { name: `Articles`, title: `Blog Articles`, hitComp: `PostHit` },
]

export default class BlogList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showTOC: false,
    }
  }

  toggleTOC = () => {
    this.setState(({ showTOC }) => ({
      showTOC: !showTOC,
    }))
  }

  render() {
    const posts = this.props.data.postsPerPage.edges
    const {
      pageContext: { currentPage, numPages },
    } = this.props
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1 ? "/" : `/${(currentPage - 1).toString()}`
    const nextPage = `/${(currentPage + 1).toString()}`
    const { showTOC } = this.state
    return (
      <Layout>
        <SEO title="JavaScript Tutorials For Everyone" />
        <div
          style={{
            padding: "0 2rem 2rem 2rem",
            margin: "0 -2rem",
            backgroundColor: "#fafafa",
          }}
        >
          <h1>Complicated stuff in simple words</h1>
          <SubTitle>
            <TOCWrapper
              role="button"
              tabIndex="0"
              onClick={this.toggleTOC}
              onKeyPress={this.toggleTOC}
            >
              Table of contents
              <span
                style={{
                  fontWeight: "400",
                  display: "inline-block",
                  marginLeft: "0.25rem",
                }}
              >
                (Total articles: {this.props.data.allPosts.edges.length})
              </span>
              <span
                style={{
                  transform: showTOC ? "rotate(90deg)" : "rotate(-90deg)",
                  marginLeft: "0.5rem",
                  display: "inline-block",
                }}
              >
                &#60;
              </span>
            </TOCWrapper>
            <SearchWrapper>
              <Search collapse indices={searchIndices} />
            </SearchWrapper>
          </SubTitle>
          {showTOC && (
            <div style={{ display: "flex", marginTop: "0.725rem" }}>
              <section style={{ flex: "auto" }}>
                <ul style={{ margin: 0 }}>
                  {this.props.data.allPosts.edges.map(({ node }) => (
                    <li style={{ listStyle: "none" }} key={node.fields.slug}>
                      <Link to={node.fields.slug}>
                        {node.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
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
              <Link to={`/${numPages.toString()}`} rel="prev">
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
    postsPerPage: allMarkdownRemark(
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
          }
        }
      }
    }
  }
`
