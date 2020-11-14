import React from "react"

import Newsletter from "@components/Newsletter"

import {
  Wrapper,
  Block,
  Title,
  Item,
  RedHot,
  ReactIcon,
  JavascriptIcon,
} from "./styles"

const Sidebar = ({ allPosts }) => {
  const promote = []
  const reactPosts = []
  const jsPosts = []

  allPosts.forEach(({ node }) => {
    if (node.frontmatter.tag.includes("React")) {
      reactPosts.push(node)
    }
    if (node.frontmatter.tag.includes("JavaScript")) {
      jsPosts.push(node)
    }
    if (node.frontmatter.promote) {
      promote.push(node)
    }
  })

  return (
    <Wrapper>
      <Block>
        <Title>
          <RedHot />
          Most Popular
        </Title>
        {promote.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
      <Block newsletter>
        <Newsletter />
      </Block>
      <Block>
        <Title>
          <ReactIcon />
          React
        </Title>
        {reactPosts.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
      <Block>
        <Title>
          <JavascriptIcon />
          JavaScript
        </Title>
        {jsPosts.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
    </Wrapper>
  )
}

export default Sidebar
