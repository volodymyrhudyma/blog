import styled from "styled-components"

export const Wrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
`

export const BlogTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.25rem;
`

export const BlogDate = styled.span`
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`

export const Image = styled.div`
  width: 200px;
  background-color: rgb(250, 250, 250);
  margin-right: 1rem;
  flex-shrink: 0;
  color: #000;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 1rem;
  position: relative;
`

export const JST = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  margin: 0;
`
