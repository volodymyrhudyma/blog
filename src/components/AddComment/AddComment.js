import React, { useState } from "react"
import axios from "axios"

import { Input, Textarea, FlashMessage, Button, Wrapper } from "./styles"

const AddComment = () => {
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

  return (
    <Wrapper>
      <h3>Responses</h3>
      <form onSubmit={onSubmit} action={process.env.STATICMAN_URL}>
        {flashMessage && (
          <FlashMessage type={flashMessage.type}>
            {flashMessage.message}
          </FlashMessage>
        )}
        <Input name="slug" type="hidden" value={comment.slug} />
        <Input
          name="name"
          type="text"
          placeholder="Name"
          onChange={onChange}
          value={comment.name}
          required
        />
        <Textarea
          name="message"
          placeholder="Message"
          onChange={onChange}
          value={comment.message}
          rows="3"
          required
        />
        <Button>Submit</Button>
      </form>
    </Wrapper>
  )
}

export default AddComment
