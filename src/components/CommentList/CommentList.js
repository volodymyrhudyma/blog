import React from "react"

import {
  Wrapper,
  CommentNode,
  CommentTop,
  AuthorName,
  CommentDate,
  CommentMessage,
} from "./styles"

const CommentList = ({ comments }) => (
  <Wrapper>
    {comments?.edges.map(({ node }) => (
      <CommentNode key={node.id}>
        <CommentTop>
          <AuthorName>{node.name}</AuthorName>
          <CommentDate>{node.date}</CommentDate>
        </CommentTop>
        <CommentMessage>{node.message}</CommentMessage>
      </CommentNode>
    ))}
  </Wrapper>
)

export default CommentList
