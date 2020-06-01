import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import onClickOutside from "react-onclickoutside"

import Loader from "@components/Loader"

import {
  Input,
  Textarea,
  FlashMessage,
  Button,
  Wrapper,
  Title,
  DefaultCommentBlock,
} from "./styles"

const AddComment = ({ slug }) => {
  const nameInputRef = useRef(null)

  const [showCommentBlock, setShowCommentBlock] = useState(false)
  const [flashMessage, setFlashMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState({
    slug,
    name: "",
    message: "",
  })

  const onSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log("process.env.GATSBY_STATICMAN_URL")
      console.log(process.env.GATSBY_STATICMAN_URL)
      await axios.post(process.env.GATSBY_STATICMAN_URL, {
        fields: {
          name: comment.name,
          message: comment.message,
          slug: comment.slug,
        },
      })
      setLoading(false)
      resetComment()
      addFlashMessage(
        "success",
        "Appreciate it. Your comment will appear after moderation step"
      )
    } catch (e) {
      console.log(e)
      setLoading(false)
      addFlashMessage("error", "Something went wrong")
    }
  }

  const addFlashMessage = (type, message) => {
    setFlashMessage({
      type,
      message,
    })
    setTimeout(() => {
      setFlashMessage(null)
    }, 5000)
  }

  const resetComment = () => {
    setComment({
      ...comment,
      name: "",
      message: "",
    })
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
      <Title>Let me know what you think about this article</Title>
      {showCommentBlock ? (
        <form onSubmit={onSubmit} action={process.env.GATSBY_STATICMAN_URL}>
          {flashMessage && (
            <FlashMessage type={flashMessage.type}>
              {flashMessage.message}
            </FlashMessage>
          )}
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
          {loading && (
            <div style={{ marginBottom: "1rem" }}>
              <Loader />
            </div>
          )}
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

AddComment.prototype = {}

export default onClickOutside(AddComment, clickOutsideConfig)
