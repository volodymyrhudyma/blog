import React from "react"
import { Link } from "gatsby"

import { Wrapper } from "./styles"

const BlogPostItem = ({ post }) => (
  <Wrapper>
    <Link to={post.fields.slug}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
  </Wrapper>
)

export default BlogPostItem
