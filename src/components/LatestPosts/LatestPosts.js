import React from "react"
import moment from "moment"

import Search from "@components/Search"

import {
  Wrapper,
  WrapperTop,
  SectionHeading,
  PostsWrapper,
  PostBox,
  PostImage,
  PostTop,
  PostTitle,
  PostDate,
  SearchWrapper,
  PostInner,
} from "./styles"

const searchIndices = [
  { name: `Articles`, title: `Blog Articles`, hitComp: `PostHit` },
]

const LatestPosts = ({ posts }) => (
  <Wrapper>
    <WrapperTop>
      <SectionHeading>Latest Posts</SectionHeading>
      <SearchWrapper>
        <Search collapse indices={searchIndices} />
      </SearchWrapper>
    </WrapperTop>
    <PostsWrapper>
      {posts.map(({ node: post }, index) => (
        <PostBox key={index} to={post.fields.slug}>
          <PostImage image={post.frontmatter.shareImage} />
          <PostInner
            backgroundColor={
              post.frontmatter.tag.includes("React")
                ? "rgba(97, 219, 251, 0.2)"
                : post.frontmatter.tag.includes("Git")
                ? "rgba(241, 80, 47, 0.2)"
                : ""
            }
          >
            <PostTitle>{post.frontmatter.title}</PostTitle>
            <PostTop>
              <PostDate>{moment(post.frontmatter.date).fromNow()}</PostDate>
            </PostTop>
          </PostInner>
        </PostBox>
      ))}
    </PostsWrapper>
  </Wrapper>
)

export default LatestPosts
