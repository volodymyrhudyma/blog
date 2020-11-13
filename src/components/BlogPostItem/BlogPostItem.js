import React from "react"
import { Link } from "gatsby"

import {
  Wrapper,
  BlogTitle,
  BlogDetail,
  BlogDate,
  BlogTag,
  ReadMoreButton,
} from "./styles"

const BlogPostItem = ({ post }) => (
  <Wrapper>
    <div>
      <BlogTitle>
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </BlogTitle>
      <BlogDetail>
        <BlogDate>{post.frontmatter.date}</BlogDate>
        {post.frontmatter.tag.map(tag => (
          <BlogTag key={tag}>#{tag}</BlogTag>
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
