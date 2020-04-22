import React from "react"
import { Link } from "gatsby"

const BlogPostItem = ({ post }) => (
  <div>
    <span>{post.frontmatter.date}</span>
    <h2>
      <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
    </h2>
    <p>{post.excerpt}</p>
    <div>
      <Link to={post.fields.slug}>Read more</Link>
    </div>
  </div>
)

export default BlogPostItem
