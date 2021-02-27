import React from "react"
import { Link } from "gatsby"

import {
  Wrapper,
  BlogTitle,
  BlogDetail,
  BlogDate,
  BlogTag,
  StyledLink,
  PostNumber,
} from "./styles"

const BlogPostItem = ({ post, number }) => (
  <Wrapper>
    <div>
      <PostNumber>{number + 1}</PostNumber>
      <BlogTitle>
        <StyledLink to={post.fields.slug}>{post.frontmatter.title}</StyledLink>
      </BlogTitle>
      <BlogDetail>
        <BlogDate>{post.frontmatter.date}</BlogDate>
        {post.frontmatter.tag.map(tag => (
          <BlogTag key={tag} to={`/tag/${tag.toLowerCase()}`}>
            #{tag}
          </BlogTag>
        ))}
      </BlogDetail>
      <p style={{ margin: 0 }}>
        {post.frontmatter.teaser}
        <Link style={{ marginLeft: "0.25rem" }} to={post.fields.slug}>
          Read more
        </Link>
      </p>
    </div>
  </Wrapper>
)

export default BlogPostItem
