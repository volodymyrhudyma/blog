import React, { useState } from "react"
import axios from "axios"

const AddComment = () => {
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
    } catch (e) {
      console.log(e)
    }
  }

  const onChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={onSubmit} action={process.env.STATICMAN_URL}>
      <input name="slug" type="hidden" value={comment.slug} />
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={onChange}
        value={comment.name}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        onChange={onChange}
        value={comment.message}
        required
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddComment
