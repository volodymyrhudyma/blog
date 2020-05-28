import React from "react"
import { Link } from "gatsby"

import { Wrapper, BlogTitle, BlogDate } from "./styles"

const BlogPostItem = ({ post }) => (
  <Wrapper>
    <BlogTitle>
      <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
    </BlogTitle>
    <BlogDate>{post.frontmatter.date}</BlogDate>
    <p style={{ margin: 0 }}>
      {post.frontmatter.teaser}
      <Link style={{ marginLeft: "0.25rem" }} to={post.fields.slug}>
        Read more
      </Link>
    </p>
  </Wrapper>
)

export default BlogPostItem
