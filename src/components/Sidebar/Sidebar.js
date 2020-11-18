import React from "react"

import Newsletter from "@components/Newsletter"

import {
  Wrapper,
  Block,
  Title,
  Text,
  Item,
  RedHot,
  ReactIcon,
  JavascriptIcon,
  LinkIconStyled,
  OtherIcon,
} from "./styles"

const Sidebar = ({ allPosts, extended }) => {
  const promote = []
  const reactPosts = []
  const jsPosts = []
  const otherPosts = []

  allPosts.forEach(({ node }) => {
    if (node.frontmatter.tag.includes("React")) {
      reactPosts.push(node)
    }
    if (node.frontmatter.tag.includes("JavaScript")) {
      jsPosts.push(node)
    }
    if (node.frontmatter.tag.includes("Other")) {
      otherPosts.push(node)
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
            <LinkIconStyled />
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
            <LinkIconStyled />
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
      {extended && (
        <Block newsletter>
          <Title>Like this article?</Title>
          <Text>Support me by sharing it on social media</Text>
        </Block>
      )}
      <Block>
        <Title>
          <JavascriptIcon />
          JavaScript
        </Title>
        {jsPosts.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            <LinkIconStyled />
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
      <Block>
        <Title>
          <OtherIcon />
          Other
        </Title>
        {otherPosts.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            <LinkIconStyled />
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
    </Wrapper>
  )
}

export default Sidebar
