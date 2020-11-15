import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"

import {
  Wrapper,
  Form,
  Input,
  Hint,
  Button,
  Title,
  SubTitle,
  SubscribeResponse,
} from "./styles"

const Newsletter = ({ wide }) => {
  const [email, setEmail] = useState("")
  const [mailChimpResponse, setMailChimpResponse] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await addToMailchimp(email)
    setMailChimpResponse(response)
    setTimeout(() => {
      setMailChimpResponse("")
    }, 3000)
  }

  return (
    <Wrapper wide={wide}>
      <Title>Newsletter</Title>
      <SubTitle>Receive all new posts directly to your e-mail</SubTitle>
      <Form onSubmit={handleSubmit} wide={wide}>
        <Input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Type your e-mail address..."
        />
        <Hint>No spam, I promise</Hint>
        <Button>Subscribe</Button>
      </Form>
      {mailChimpResponse && (
        <SubscribeResponse
          dangerouslySetInnerHTML={{ __html: mailChimpResponse.msg }}
        />
      )}
    </Wrapper>
  )
}

export default Newsletter
