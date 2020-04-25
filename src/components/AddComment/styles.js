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
  color: ${({ type }) => (type === "success" ? "#1ca086" : "red")};
  border: 1px solid;
  padding: 1rem;
  margin-bottom: 1rem;
`

export const Button = styled.button`
  background-color: #1ca086;
  color: #fff;
  border: none;
  padding: 0.5rem 2rem;
  cursor: pointer;
`

export const Wrapper = styled.div`
  border-top: 1px solid lightgray;
`

export const Title = styled.div`
  font-weight: bold;
  margin-top: 1.45rem;
  margin-bottom: 0.95rem;
`

export const DefaultCommentBlock = styled.div`
  cursor: pointer;
`
