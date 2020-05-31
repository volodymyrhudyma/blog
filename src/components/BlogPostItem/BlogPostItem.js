import React from "react"
import { Link } from "gatsby"

import { Wrapper, BlogTitle, BlogDate, Image, JST } from "./styles"

const BlogPostItem = ({ post }) => (
  <Wrapper>
    <Image>
      {post.frontmatter.title}
      <JST src="./favicon/favicon.png" />
    </Image>
    <div>
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
    </div>
  </Wrapper>
)

export default BlogPostItem
