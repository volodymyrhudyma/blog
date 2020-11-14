import styled, { css } from "styled-components"

const shared = css`
  width: 100%;
  border: none;
  outline: none;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
`

export const Input = styled.input`
  ${shared};
`

export const Textarea = styled.textarea`
  resize: none;
  ${shared};
`

export const FlashMessage = styled.div`
  color: ${({ type }) => (type === "success" ? "#1f7504" : "red")};
  border: 1px solid;
  padding: 1rem;
  margin-bottom: 1rem;
`

export const Button = styled.button`
  display: inline-block;
  background-color: #000;
  border: 1px solid #000;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 2rem;
  transition: background-color 0.5s;
  outline: none;

  &:hover {
    background-color: transparent;
    color: #000;
  }
`

export const Wrapper = styled.div`
  border-top: 1px solid #d6d6d6;
`

export const Title = styled.div`
  font-weight: bold;
  margin-top: 1.45rem;
  margin-bottom: 0.95rem;
`

export const DefaultCommentBlock = styled.div`
  cursor: pointer;
  margin-bottom: 1.45rem;
`
