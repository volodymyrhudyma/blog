import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import onClickOutside from "react-onclickoutside"

import {
  Input,
  Textarea,
  FlashMessage,
  Button,
  Wrapper,
  Title,
  DefaultCommentBlock,
} from "./styles"

const AddComment = () => {
  const nameInputRef = useRef(null)

  const [showCommentBlock, setShowCommentBlock] = useState(false)
  const [flashMessage, setFlashMessage] = useState(null)
  const [comment, setComment] = useState({
    slug: "slug",
    name: "",
    message: "",
  })

  const onSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(process.env.STATICMAN_URL, {
        options: {
          slug: comment.slug,
        },
        fields: {
          name: comment.name,
          message: comment.message,
        },
      })
      setFlashMessage({
        type: "success",
        message: "Thank you, appreciate it",
      })
    } catch (e) {
      setFlashMessage({
        type: "error",
        message: "Something went wrong",
      })
    }
  }

  const onChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    })
  }

  const onDefaultCommentBlockClick = () => {
    setShowCommentBlock(show => !show)
  }

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [showCommentBlock])

  AddComment.handleClickOutside = () => setShowCommentBlock(false)

  return (
    <Wrapper>
      <Title>Support author</Title>
      {showCommentBlock ? (
        <form onSubmit={onSubmit} action={process.env.STATICMAN_URL}>
          {flashMessage && (
            <FlashMessage type={flashMessage.type}>
              {flashMessage.message}
            </FlashMessage>
          )}
          <Input name="slug" type="hidden" value={comment.slug} />
          <Input
            ref={nameInputRef}
            name="name"
            type="text"
            placeholder="Name..."
            onChange={onChange}
            value={comment.name}
            required
          />
          <Textarea
            name="message"
            placeholder="Message..."
            onChange={onChange}
            value={comment.message}
            rows="3"
            required
          />
          <Button>Publish</Button>
        </form>
      ) : (
        <DefaultCommentBlock onClick={onDefaultCommentBlockClick}>
          Click here to write response...
        </DefaultCommentBlock>
      )}
    </Wrapper>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => AddComment.handleClickOutside,
}

export default onClickOutside(AddComment, clickOutsideConfig)
