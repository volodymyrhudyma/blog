import React, { Fragment } from "react"
import { Link } from "gatsby"

import Newsletter from "@components/Newsletter"

import {
  Wrapper,
  Block,
  Title,
  Text,
  Item,
  LinkIconStyled,
  HashIconStyled,
  OtherIcon,
} from "./styles"

const Sidebar = ({ allPosts, tags, extended }) => {
  const promote = []
  const reactPosts = []
  const jsPosts = []
  const gitPosts = []
  const otherPosts = []

  allPosts.forEach(({ node }) => {
    if (node.frontmatter.tag.includes("React")) {
      reactPosts.push(node)
    }
    if (node.frontmatter.tag.includes("JavaScript")) {
      jsPosts.push(node)
    }
    if (node.frontmatter.tag.includes("Git")) {
      gitPosts.push(node)
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
      <Block grey>
        <Title>Tags</Title>
        {tags
          .sort((a, b) => b.totalCount - a.totalCount)
          .map((tag, i) => (
            <div key={i}>
              <Link
                to={`/tag/${tag.fieldValue.toLowerCase()}`}
                style={{ fontSize: `${16 + (16 * tag.totalCount) / 100}px` }}
              >
                #{tag.fieldValue} ({tag.totalCount})
              </Link>
            </div>
          ))}
      </Block>
      <Block>
        <Title>Most Popular</Title>
        {promote.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            <LinkIconStyled />
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
      <Block green>
        <Newsletter />
      </Block>
      <Block grey>
        <Title>React</Title>
        {reactPosts.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            <LinkIconStyled />
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
      <Block>
        <Title>JavaScript</Title>
        {jsPosts.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            <LinkIconStyled />
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
      {extended ? (
        <Block black>
          <Title>Like this article?</Title>
          <Text>Support me by sharing it on social media</Text>
        </Block>
      ) : (
        <Block black>
          <Title>Like my blog?</Title>
          <Text>Support me by sharing it on social media</Text>
        </Block>
      )}

      <Block>
        <Title>Git</Title>
        {gitPosts.slice(0, 3).map((post, i) => (
          <Item key={i} to={post.fields.slug}>
            <LinkIconStyled />
            {post.frontmatter.title}
          </Item>
        ))}
      </Block>
      <Block grey>
        <Title>Other</Title>
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
