import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import { SearchIcon, Form, Input } from "./styles"

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <Input
      type="text"
      placeholder="Search for an article..."
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
    <SearchIcon />
  </Form>
))
