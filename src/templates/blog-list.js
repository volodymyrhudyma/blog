import React from "react"
import { Link, graphql } from "gatsby"
import findIndex from "lodash/findIndex"

import BlogPostItem from "@components/BlogPostItem"
import Layout from "@components/Layout"
import SEO from "@components/seo"
import Sidebar from "@components/Sidebar"
import TableOfContents from "@components/TableOfContents"
import LatestPosts from "@components/LatestPosts"
import Newsletter from "@components/Newsletter"

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
      pageContext: { currentPage, numPages },
    } = this.props
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1 ? "/" : `/${(currentPage - 1).toString()}`
    const nextPage = `/${(currentPage + 1).toString()}`

    const allPosts = this.props.data.allPosts.edges
    const tags = this.props.data.tags.group

    return (
      <Layout>
        <SEO
          title={`The Easiest JavaScript And ReactJS Tutorials ${
            currentPage > 1 ? `| Page ${currentPage}` : ``
          }`}
        />
        {currentPage === 1 && <LatestPosts posts={allPosts.slice(0, 4)} />}
        <SubTitle>
          <TableOfContents allPosts={allPosts} showSearch={currentPage > 1} />
        </SubTitle>
        <BlogListContent>
          <div>
            {posts.map(({ node }) => (
              <BlogPostItem
                key={node.fields.slug}
                post={node}
                number={findIndex(
                  allPosts,
                  post => post.node.frontmatter.title === node.frontmatter.title
                )}
              />
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
            <Newsletter wide />
          </div>
          <SidebarWrapper>
            <Sidebar allPosts={allPosts} tags={tags} />
          </SidebarWrapper>
        </BlogListContent>
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
            metaDescription
            shareImage
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
