import React from "react"
import { Link, graphql } from "gatsby"

import BlogPostItem from "@components/BlogPostItem"
import Layout from "@components/Layout"
import SEO from "@components/seo"
import Sidebar from "@components/Sidebar"
import TableOfContents from "@components/TableOfContents"

import {
  PaginationWrapper,
  PageInfo,
  SubTitle,
  BlogListContent,
  SidebarWrapper,
} from "./styles"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.postsPerPage.edges
    const {
      pageContext: { tag, currentPage, numPages },
    } = this.props
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1
        ? `/tag/${tag.toLowerCase()}`
        : `/tag/${tag.toLowerCase()}/${(currentPage - 1).toString()}`
    const nextPage = `/tag/${tag.toLowerCase()}/${(currentPage + 1).toString()}`

    const allPosts = this.props.data.allPosts.edges
    const tags = this.props.data.tags.group
    return (
      <Layout>
        <SEO title="JavaScript And ReactJS Tutorials With Best Practices" />
        <SubTitle>
          <TableOfContents allPosts={allPosts} />
        </SubTitle>
        <BlogListContent>
          <div>
            {posts.map(({ node }) => (
              <BlogPostItem key={node.fields.slug} post={node} />
            ))}
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
                  <Link
                    to={`/tag/${tag.toLowerCase()}/${numPages.toString()}`}
                    rel="prev"
                  >
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
          </div>
          <SidebarWrapper>
            <Sidebar allPosts={allPosts} tags={tags} />
          </SidebarWrapper>
        </BlogListContent>
      </Layout>
    )
  }
}

export const tagListQuery = graphql`
  query tagListQuery($skip: Int!, $limit: Int!, $tag: String!) {
    postsPerPage: allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tag: { eq: $tag } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            teaser
            tag
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
            tag
            date(formatString: "MMMM DD, YYYY")
            promote
          }
        }
      }
    }
    tags: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tag) {
        fieldValue
        totalCount
      }
    }
  }
`
