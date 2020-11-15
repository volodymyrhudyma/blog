import React from "react"
import { Link, graphql } from "gatsby"
import get from "lodash/get"

import BlogPostItem from "@components/BlogPostItem"
import Layout from "@components/Layout"
import SEO from "@components/seo"
import Search from "@components/Search"
import Sidebar from "@components/Sidebar"

import {
  PaginationWrapper,
  PageInfo,
  SubTitle,
  SearchWrapper,
  TOCTag,
  TOCWrapper,
  TOCLink,
  TOCSectionList,
  TOCSectionListItem,
  BlackAngleDown,
  BlogListContent,
  SidebarWrapper,
  StyledLink,
  LinkIconStyled,
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

  groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = get(obj, key)
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    }, {})

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

    const allPosts = this.props.data.allPosts.edges
    const groupByTag = this.groupBy("node.frontmatter.tag")
    const groupedTOC = groupByTag(allPosts)
    return (
      <Layout>
        <SEO title="JavaScript And ReactJS Tutorials With Best Practices" />
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
              (Articles: {this.props.data.allPosts.edges.length})
            </span>
            <span
              style={{
                transform: showTOC ? "rotate(180deg)" : "rotate(0)",
                marginLeft: "0.5rem",
                display: "inline-block",
              }}
            >
              <BlackAngleDown />
            </span>
          </TOCWrapper>
          <SearchWrapper>
            <Search collapse indices={searchIndices} />
          </SearchWrapper>
        </SubTitle>
        {showTOC && (
          <div style={{ display: "flex" }}>
            <section style={{ flex: "auto" }}>
              <TOCSectionList>
                {Object.keys(groupedTOC).map(tag => {
                  return (
                    <TOCSectionListItem key={tag}>
                      <TOCTag>{tag}</TOCTag>
                      {groupedTOC[tag].map(({ node }) => (
                        <TOCLink key={node.fields.slug}>
                          <StyledLink to={node.fields.slug}>
                            <LinkIconStyled />
                            {node.frontmatter.title}
                          </StyledLink>
                        </TOCLink>
                      ))}
                    </TOCSectionListItem>
                  )
                })}
              </TOCSectionList>
            </section>
          </div>
        )}
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
          </div>
          <SidebarWrapper>
            <Sidebar allPosts={allPosts} />
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
            promote
          }
        }
      }
    }
  }
`
