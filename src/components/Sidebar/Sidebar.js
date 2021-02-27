import React, { Fragment } from "react"
import { Link } from "gatsby"

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
  HashIconStyled,
  OtherIcon,
} from "./styles"

const Sidebar = ({ allPosts, tags, extended }) => {
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
      <Block newsletter>
        <Title>
          <HashIconStyled />
          Tags
        </Title>
        {tags
          .sort((a, b) => b.totalCount - a.totalCount)
          .map((tag, i) => (
            <div key={i}>
              <Link
                to={`/tag/${tag.fieldValue.toLowerCase()}`}
                style={{ fontSize: `${16 + (16 * tag.totalCount) / 100}px` }}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </div>
          ))}
      </Block>
      <Block>
        <Title>
          <RedHot />
          Most Popular
        </Title>
        {console.log(promote)}
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
