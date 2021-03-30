import React from "react"

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
  StarsWrapper,
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
          {post.frontmatter.title === "I Wrote 99 Articles On My Blog" && (
            <StarsWrapper />
          )}
          <PostInner>
            <PostTitle>{post.frontmatter.title}</PostTitle>
            <PostTop>
              <PostDate>{post.frontmatter.date}</PostDate>
            </PostTop>
          </PostInner>
        </PostBox>
      ))}
    </PostsWrapper>
  </Wrapper>
)

export default LatestPosts
