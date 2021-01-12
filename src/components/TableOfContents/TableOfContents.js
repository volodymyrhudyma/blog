import React, { useState } from "react"
import get from "lodash/get"

import Search from "@components/Search"

import {
  Wrapper,
  WrapperOuter,
  SearchWrapper,
  BlackAngleDown,
  TOCTag,
  TOCLink,
  TOCSectionList,
  TOCSectionListItem,
  StyledLink,
  BlogDate,
} from "./styles"

const searchIndices = [
  { name: `Articles`, title: `Blog Articles`, hitComp: `PostHit` },
]

const TableOfContents = ({ allPosts }) => {
  const [showTOC, setShowTOC] = useState(false)
  const [showIndexes, setShowIndexes] = useState([])

  const toggleTOC = () => {
    setShowTOC(!showTOC)
  }

  const toggleIndex = index => {
    if (showIndexes.includes(index)) {
      setShowIndexes(showIndexes.filter(i => i !== index))
    } else {
      setShowIndexes([...showIndexes, index])
    }
  }

  const groupBy = key => array => {
    let objectsByKeyValue = {}
    array.forEach(obj => {
      const value = get(obj, key)
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    })
    return objectsByKeyValue
  }

  const groupByTag = groupBy("node.frontmatter.tag")
  const groupedTOC = groupByTag(allPosts)

  return (
    <>
      <WrapperOuter>
        <Wrapper
          role="button"
          tabIndex="0"
          onClick={toggleTOC}
          onKeyPress={toggleTOC}
        >
          Table of contents
          <span
            style={{
              fontWeight: "400",
              display: "inline-block",
              marginLeft: "0.25rem",
            }}
          >
            (Articles: {allPosts.length})
          </span>
          <span
            style={{
              transform: showTOC ? "rotate(180deg)" : "rotate(0)",
              marginLeft: "0.5rem",
              display: "inline-block",
            }}
          >
            <BlackAngleDown />
          </span>
        </Wrapper>
        <SearchWrapper>
          <Search collapse indices={searchIndices} />
        </SearchWrapper>
      </WrapperOuter>
      {showTOC && (
        <div style={{ marginTop: "2rem" }}>
          <TOCSectionList>
            {Object.keys(groupedTOC).map((tag, index) => {
              return (
                <TOCSectionListItem
                  key={tag}
                  addBorder={!showIndexes.includes(index)}
                >
                  <TOCTag
                    onClick={() => {
                      toggleIndex(index)
                    }}
                  >
                    {tag} ({groupedTOC[tag].length})
                    <span
                      style={{
                        transform: showIndexes.includes(index)
                          ? "rotate(0)"
                          : "rotate(180deg)",
                        marginLeft: "0.5rem",
                        display: "inline-block",
                      }}
                    >
                      <BlackAngleDown />
                    </span>
                  </TOCTag>
                  {showIndexes.includes(index) &&
                    groupedTOC[tag].map(({ node }) => (
                      <TOCLink key={node.fields.slug}>
                        <StyledLink to={node.fields.slug}>
                          {node.frontmatter.title}{" "}
                          <BlogDate>({node.frontmatter.date})</BlogDate>
                        </StyledLink>
                      </TOCLink>
                    ))}
                </TOCSectionListItem>
              )
            })}
          </TOCSectionList>
        </div>
      )}
    </>
  )
}

export default TableOfContents
