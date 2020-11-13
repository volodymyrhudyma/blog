import React from "react"

import Newsletter from "@components/Newsletter"

import { Wrapper, Block, Title, Item } from "./styles"

const Sidebar = () => (
  <Wrapper>
    <Block>
      <Title>Most Popular</Title>
      <Item>The Right Way of Logging with Console API in JavaScript</Item>
      <Item>Context API in React</Item>
      <Item>Context API in React</Item>
    </Block>
    <Block>
      <Title>React</Title>
      <Item>Context API in React</Item>
      <Item>Context API in React</Item>
      <Item>Context API in React</Item>
    </Block>
    <Block>
      <Title>JavaScript</Title>
      <Item>Context API in React</Item>
      <Item>Context API in React</Item>
      <Item>Context API in React</Item>
    </Block>
    <Block>
      <Newsletter />
    </Block>
  </Wrapper>
)

export default Sidebar
