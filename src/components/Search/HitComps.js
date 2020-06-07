import React from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"
import { Calendar } from "styled-icons/octicons"

export const PostHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={hit.fields.slug} onClick={clickHandler}>
      <div style={{ fontWeight: "bold", margin: 0 }}>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </div>
    </Link>
    <div style={{ fontSize: "0.85rem" }}>
      <Calendar size="1em" />
      &nbsp;
      <Highlight attribute="date" hit={hit} tagName="mark" />
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)
