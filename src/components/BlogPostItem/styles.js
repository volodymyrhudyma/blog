import styled from "styled-components"

export const Wrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
`

export const BlogTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

export const BlogDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

export const BlogDate = styled.div`
  font-size: 0.85rem;
  margin-right: 0.5rem;
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

  @media (max-width: 768px) {
    display: none;
  }
`

export const JST = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  margin: 0;
`

export const BlogTag = styled.div`
  display: inline-block;
  font-size: 0.85rem;
  color: #1ca086;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`
