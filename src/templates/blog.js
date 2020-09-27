import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import slugify from "slugify"

import BackButton from "@components/BackButton"
import Layout from "@components/Layout"
import AddComment from "@components/AddComment/AddComment"
import CommentList from "@components/CommentList/CommentList"
import SEO from "@components/seo"

import { BlogTag } from "../components/BlogPostItem/styles"

export default function Template({ data, path }) {
  const { article, comments } = data
  const { frontmatter } = article

  const [html, setHtml] = useState(article.html)
  const [headings, setHeadings] = useState([])
  const [showTOC, setShowTOC] = useState(true)

  useEffect(() => {
    const div = document.createElement("div")
    div.innerHTML = html
    const h2List = [...div.getElementsByTagName("h2")]
    let newHtml = html
    h2List.forEach(item => {
      const element = `<h2>${item.innerHTML}</h2>`
      const h2Start = newHtml.indexOf(element)
      const insertElement = `<div id='${slugify(item.innerHTML)}' />`
      newHtml = [
        newHtml.slice(0, h2Start),
        insertElement,
        newHtml.slice(h2Start),
      ].join("")
    })
    setHeadings(h2List)
    setHtml(newHtml)
  }, [])

  const toggleTOC = () => {
    setShowTOC(!showTOC)
  }

  return (
    <Layout hideHero>
      <SEO
        title={frontmatter.title}
        description={frontmatter.metaDescription}
      />
      <div>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
          {frontmatter.title}
        </h1>
        <span
          style={{
            fontSize: "0.85rem",
            display: "inline-block",
            marginBottom: "1.45rem",
            marginRight: "0.75rem",
          }}
        >
          {frontmatter.date}
        </span>
        {frontmatter.tag.map(tag => (
          <BlogTag key={tag}>#{tag}</BlogTag>
        ))}
        <div style={{ marginBottom: "1.45rem" }}>
          You are here:{" "}
          <Link style={{ marginRight: "0.25rem" }} to="/">
            Home
          </Link>
          <span style={{ marginRight: "0.25rem", display: "inline-block" }}>
            /
          </span>
          <span>{frontmatter.title}</span>
        </div>
      </div>
      <h2
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(205, 205, 205)",
          paddingBottom: "1.45rem",
          cursor: "pointer",
          outline: "none",
        }}
        onClick={toggleTOC}
        onKeyPress={toggleTOC}
      >
        Table of contents
        <span
          style={{
            transform: showTOC ? "rotate(90deg)" : "rotate(-90deg)",
            outline: "none",
          }}
        >
          &#60;
        </span>
      </h2>
      {showTOC && (
        <ul
          style={{
            borderBottom: "1px solid rgb(204, 204, 204)",
            margin: "0 0 1.45rem 0",
            paddingLeft: "1.45rem",
            paddingBottom: "0.725rem",
          }}
        >
          {headings.map((item, index) => (
            <li key={index}>
              <a href={`#${slugify(item.innerHTML)}`}>{item.innerHTML}</a>
            </li>
          ))}
        </ul>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <BackButton text="All articles" />
      <AddComment slug={path} />
      <CommentList comments={comments} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    article: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        tag
        teaser
        date(formatString: "MMMM DD, YYYY")
        metaDescription
      }
      fields {
        slug
      }
    }
    comments: allCommentsYaml(filter: { slug: { eq: $path } }) {
      edges {
        node {
          id
          name
          message
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
