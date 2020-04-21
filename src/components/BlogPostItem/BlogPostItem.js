import React from "react"
import { Link } from "gatsby"

import { Wrapper, Date, Title, Excerpt, ReadMore } from "./styles"

const BlogPostItem = ({ post }) => (
  <Wrapper>
    <Date>{post.frontmatter.date}</Date>
    <Link to={post.fields.slug}>
      <Title>{post.frontmatter.title}</Title>
    </Link>
    <Excerpt>{post.excerpt}</Excerpt>
    <Link to={post.fields.slug}>
      <ReadMore>Read more</ReadMore>
    </Link>
  </Wrapper>
)

export default BlogPostItem
