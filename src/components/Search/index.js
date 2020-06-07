import React, { useState, useRef } from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import onClickOutside from "react-onclickoutside"

import { Root, HitsWrapper, PoweredBy } from "./styles"
import Input from "./Input"
import * as hitComps from "./hitComps"

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

function Search({ indices, collapse }) {
  Search.handleClickOutside = e => {
    !hitsRef.current?.contains(e.target) && setFocus(false)
  }

  const hitsRef = useRef(null)

  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      {query.length > 0 && focus && (
        <HitsWrapper ref={hitsRef}>
          {indices.map(({ name, hitComp }) => (
            <Index key={name} indexName={name}>
              <header style={{ marginBottom: "1rem" }}>
                <Stats />
              </header>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
              </Results>
            </Index>
          ))}
          <PoweredBy />
        </HitsWrapper>
      )}
    </InstantSearch>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => Search.handleClickOutside,
}

export default onClickOutside(Search, clickOutsideConfig)
