import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"

import {
  Wrapper,
  Form,
  Input,
  Button,
  Title,
  SubTitle,
  SubscribeResponse,
} from "./styles"

const Newsletter = () => {
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
    <Wrapper>
      <Title>Subscribe to the newsletter</Title>
      <SubTitle>Receive all new posts directly to your e-mail</SubTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Type your e-mail address here..."
        />
        {mailChimpResponse && (
          <SubscribeResponse>{mailChimpResponse.msg}</SubscribeResponse>
        )}
        <Button>Submit</Button>
      </Form>
    </Wrapper>
  )
}

export default Newsletter
