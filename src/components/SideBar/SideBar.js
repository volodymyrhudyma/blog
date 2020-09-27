import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Newsletter from "../Newsletter"

import {
  Wrapper,
  SideBarBox,
  Heading,
  SubHeading,
  ArticleList,
  ArticleItem,
  Text,
} from "./styles"

const SideBar = props => {
  return (
    <StaticQuery
      query={graphql`
        query MostPopularPosts {
          allMarkdownRemark(
            filter: { frontmatter: { popular: { eq: true } } }
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
      `}
      render={({ allMarkdownRemark: { edges } }) => (
        <Wrapper>
          <SideBarBox>
            <Heading>Trending</Heading>
            <ArticleList>
              {edges.map(edge => (
                <ArticleItem key={edge.node.fields.slug}>
                  <Link to={edge.node.fields.slug}>
                    {edge.node.frontmatter.title}
                  </Link>
                </ArticleItem>
              ))}
            </ArticleList>
          </SideBarBox>
          <SideBarBox>
            <Heading>Support me</Heading>
            <Text>If you like the content, please:</Text>
            <Text>- Subscribe to the newsletter</Text>
            <Text>- Share this blog with others</Text>
            <Text>
              - Add me on <Link to="#">LinkedIn</Link>
            </Text>
            <Text>
              - Follow me on <Link to="#">Twitter</Link>
            </Text>
          </SideBarBox>
          <SideBarBox noPadding>
            <Newsletter
              mini
              title="NEWSLETTER"
              subtitle="Useful content, ZERO spam."
            />
          </SideBarBox>
        </Wrapper>
      )}
    />
  )
}

export default SideBar
