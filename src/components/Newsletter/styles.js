import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ wide }) =>
    wide &&
    css`
      background-color: #1f75041c;
      margin: 1.5rem 0;
      padding: 1.5rem;
    `}
`

export const Form = styled.form`
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ wide }) =>
    wide &&
    css`
      width: 15rem;

      @media (max-width: 468px) {
        width: 100%;
      }
    `}
`

export const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #404040;
  outline: none;
  padding: 0.5rem;
  margin-bottom: 0.25rem;

  background-color: transparent;
`

export const Button = styled.button`
  display: inline-block;
  background-color: #404040;
  border: 1px solid #404040;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 2rem;
  transition: background-color 0.5s;
  outline: none;

  &:hover {
    background-color: transparent;
    color: #404040;
  }
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`

export const SubTitle = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`

export const SubscribeResponse = styled.div`
  margin-top: 1rem;
  font-size: 0.75rem;
  text-align: center;
`

export const Hint = styled.div`
  font-size: 0.75rem;
  margin-bottom: 1rem;
  color: #757575;
`
