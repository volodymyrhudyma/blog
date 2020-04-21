import React from "react"
import { Link } from "gatsby"

import { Wrapper } from "./styles"

const BlogPostItem = ({ post }) => (
  <Wrapper>
    <div>{post.frontmatter.date}</div>
    <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
  </Wrapper>
)

export default BlogPostItem
